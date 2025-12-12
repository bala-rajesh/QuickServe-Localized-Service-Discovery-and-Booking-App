import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export function LoginModal({ children }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // Assuming username is used for login as per backend
            const user = await api.auth.login({ email, password });
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                setOpen(false);
                if (user.role === "PROVIDER") {
                    navigate("/provider-dashboard");
                } else {
                    navigate("/customer-dashboard");
                }
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
                        aria-hidden="true"
                    >
                        <svg
                            className="stroke-zinc-800 dark:stroke-zinc-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
                        <DialogDescription className="sm:text-center">
                            Enter your credentials to login to your account.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Username</Label>
                            <Input
                                id="email"
                                placeholder="Enter your username"
                                type="text"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" className="font-normal text-muted-foreground">
                                Remember me
                            </Label>
                        </div>
                        <a className="text-sm underline hover:no-underline" href="#">
                            Forgot password?
                        </a>
                    </div>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>

                <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span className="text-xs text-muted-foreground">Or</span>
                </div>

                <Button variant="outline" className="w-full">Login with Google</Button>
            </DialogContent>
        </Dialog>
    );
}
