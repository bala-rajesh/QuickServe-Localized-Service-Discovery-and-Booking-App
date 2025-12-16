import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* HeroSection */}
            <section className="relative py-20 sm:py-28 md:py-32">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGjp0_NHYR7j-afmLWrZhn2vkjWgAQyRY_ybRUZAU1RLXMgzS-M0SNcGkDoMcOZ9Hv2P_2-OicNwuaLr6_-Ka3mXRF8uGvLB2ENpvBXM9KW0hcpWTL-Ks5fpeDuVRvxRDuLL3A35SZJHWS0k-Ur3YLPGRfkvImqCvkIlxy9w-BaRHDzmd9OHFv2HrcX0aPYKSRA7G0fYCdofbYVSQZDsBs_3AESz7Kcpv9oMtZ7kJwCintbN3QcxfJghscUQ13t6GywLDzyeukkjU')" }}></div>
                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-4 text-white"
                    >
                        <h1 className="text-4xl font-black leading-tight tracking-tighter sm:text-5xl md:text-6xl">
                            Local Services, Instantly.
                        </h1>
                        <p className="max-w-2xl text-base font-normal text-gray-200 sm:text-lg">
                            Connect with skilled professionals or find clients in your neighborhood with Quick Serve.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-8 flex flex-wrap justify-center gap-4"
                    >
                        <Link to="/seeker/signup">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                                whileTap={{ scale: 0.95 }}
                                className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg transition-colors"
                            >
                                Seeker Sign Up
                            </motion.button>
                        </Link>
                        <Link to="/provider/signup">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6", color: "#1d4ed8" }}
                                whileTap={{ scale: 0.95 }}
                                className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-lg bg-white px-6 text-base font-bold text-primary shadow-lg transition-colors dark:bg-surface-dark dark:text-white dark:hover:bg-gray-800"
                            >
                                Provider Sign Up
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* User Role Selection Section */}
            <section className="py-16 sm:py-24 bg-surface-light dark:bg-surface-dark">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Path</h2>
                        <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark">Whether you're looking for help or offering your skills, we've got you covered.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Card 1 (Accepter) */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex flex-col gap-4 rounded-xl bg-background-light p-8 shadow-sm transition-shadow hover:shadow-lg dark:bg-background-dark"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined !text-3xl">real_estate_agent</span>
                            </div>
                            <h3 className="text-xl font-bold">For Customers</h3>
                            <p className="flex-1 text-text-muted-light dark:text-text-muted-dark">Easily find and book local, verified professionals for any task you need. From home repairs to tutoring, get it done right.</p>
                            <Link to="/seeker/signup">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-sm font-bold text-primary transition-colors hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
                                >
                                    <span className="truncate">Get Started</span>
                                </motion.div>
                            </Link>
                        </motion.div>
                        {/* Card 2 (Provider) */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex flex-col gap-4 rounded-xl bg-background-light p-8 shadow-sm transition-shadow hover:shadow-lg dark:bg-background-dark"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined !text-3xl">construction</span>
                            </div>
                            <h3 className="text-xl font-bold">For Professionals</h3>
                            <p className="flex-1 text-text-muted-light dark:text-text-muted-dark">Find local clients, manage your bookings, and get paid securely and efficiently. Grow your business on your own terms.</p>
                            <Link to="/provider/signup">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-sm font-bold text-primary transition-colors hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
                                >
                                    <span className="truncate">Get Started</span>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 sm:py-24" id="how-it-works">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
                        <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark">A simple, streamlined process to connect and get things done.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center gap-4 text-center"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">1</div>
                            <h3 className="mt-2 text-xl font-bold">Search or Post</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark">Customers find the service they need. Professionals post the services they offer.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center gap-4 text-center"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">2</div>
                            <h3 className="mt-2 text-xl font-bold">Connect & Book</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark">Communicate directly, agree on terms, and book the service securely through the app.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center gap-4 text-center"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">3</div>
                            <h3 className="mt-2 text-xl font-bold">Complete & Pay</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark">The job gets done! Payment is handled securely and transparently in the platform.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key Benefits/Features Section */}
            <section className="py-16 sm:py-24 bg-surface-light dark:bg-surface-dark" id="features">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Quick Serve?</h2>
                        <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark">We build trust and efficiency into every interaction.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined !text-3xl">verified_user</span>
                            </div>
                            <h3 className="font-bold">Verified Providers</h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Every professional on our platform is vetted for quality and reliability.</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined !text-3xl">schedule</span>
                            </div>
                            <h3 className="font-bold">Instant Booking</h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Find available professionals and book their services in just a few clicks.</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined !text-3xl">encrypted</span>
                            </div>
                            <h3 className="font-bold">Secure Payments</h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Pay and get paid with confidence through our secure, integrated payment system.</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined !text-3xl">groups</span>
                            </div>
                            <h3 className="font-bold">Local Community</h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Connect with people in your neighborhood and support your local economy.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
