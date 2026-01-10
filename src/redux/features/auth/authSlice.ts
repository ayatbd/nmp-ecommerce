import api from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Optional: If prefer a library, `npm install jwt-decode`
// import { jwtDecode } from "jwt-decode"; 

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Helper function to decode JWT token without external libraries
const decodeToken = (token: string): User | null => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        const decoded = JSON.parse(jsonPayload);

        return {
            id: decoded.id,
            email: decoded.email
        };
    } catch (error) {
        return null;
    }
};

// LOGIN API CALL
export const loginUser = createAsyncThunk(
    "auth/login-admin",
    async (
        credentials: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const res = await api.post("/auth/login-admin", credentials);
            return res.data;
        } catch (error: unknown) {
            const errorMessage = error instanceof Object && 'response' in error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                : "Login failed";
            return thunkAPI.rejectWithValue(errorMessage || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("admin-token");
        },
    },
    extraReducers: (builder) => {
        builder
            // login pending
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 🔹 LOGIN SUCCESS (FIXED HERE)
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                // 1. Fix path: API returns { data: { accessToken: "..." } }
                // So we access action.payload.data.accessToken
                const accessToken = action.payload?.data?.accessToken;

                if (accessToken) {
                    state.token = accessToken;
                    localStorage.setItem("admin-token", accessToken);

                    // 2. Decode user from token (because API didn't send a 'user' object)
                    state.user = decodeToken(accessToken);
                }
            })
            // login failed
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;