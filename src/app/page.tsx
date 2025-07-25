"use client"
import Link from "next/link";
import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, Users, Zap, Shield, Gift, Star, Bell, Crown} from "lucide-react"
import DisButton from "@/app/components/DisButton";


// Discord Icon Component
const DiscordIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z" />
    </svg>
)

// Flying Dollars Background
const FlyingDollars = () => {
    const [dollars, setDollars] = useState<
        Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
    >([])

    useEffect(() => {
        const newDollars = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 20 + 15,
            delay: Math.random() * 10,
            duration: Math.random() * 15 + 10,
        }))
        setDollars(newDollars)
    }, [])

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {dollars.map((dollar) => (
                <motion.div
                    key={dollar.id}
                    className="absolute text-[#001514] opacity-[0.03] font-bold select-none"
                    style={{
                        left: `${dollar.x}%`,
                        top: `${dollar.y}%`,
                        fontSize: `${dollar.size}px`,
                    }}
                    animate={{
                        y: [0, -window.innerHeight - 100],
                        rotate: [0, 360],
                        opacity: [0, 0.03, 0],
                    }}
                    transition={{
                        duration: dollar.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: dollar.delay,
                        ease: "linear",
                    }}
                >
                    $
                </motion.div>
            ))}
        </div>
    )
}

// Animated Gradient Text Component
const AnimatedGradientText = ({
                                  children,
                                  className = "",
                                  colors = ["#EB5E28", "#7F96FF", "#EDF7F6"],
                              }: {
    children: React.ReactNode
    className?: string
    colors?: string[]
}) => {
    return (
        <motion.span
            className={`bg-gradient-to-r bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: `linear-gradient(45deg, ${colors.join(", ")})`,
                backgroundSize: "300% 300%",
            }}
            animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.span>
    )
}

// Tooltip Component
const Tooltip = ({
                     children,
                     content,
                     position = "bottom",
                 }: {
    children: React.ReactNode
    content: string
    position?: "top" | "bottom" | "left" | "right"
}) => {
    return (
        <div className="relative group">
            {children}
            <div
                className={`
        absolute z-50 px-3 py-2 text-xs font-medium text-white 
        bg-[#001514] border border-[#7F96FF] rounded-lg shadow-xl
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-300 transform
        ${position === "bottom" ? "top-full mt-2 left-1/2 -translate-x-1/2 group-hover:translate-y-0 translate-y-2" : ""}
        ${position === "top" ? "bottom-full mb-2 left-1/2 -translate-x-1/2 group-hover:translate-y-0 -translate-y-2" : ""}
        ${position === "left" ? "right-full mr-2 top-1/2 -translate-y-1/2 group-hover:translate-x-0 translate-x-2" : ""}
        ${position === "right" ? "left-full ml-2 top-1/2 -translate-y-1/2 group-hover:translate-x-0 -translate-x-2" : ""}
        whitespace-nowrap
      `}
            >
                {content}
                {/* Arrow */}
                <div
                    className={`
          absolute w-2 h-2 bg-[#001514] border-l border-t border-[#7F96FF] transform rotate-45
          ${position === "bottom" ? "-top-1 left-1/2 -translate-x-1/2" : ""}
          ${position === "top" ? "-bottom-1 left-1/2 -translate-x-1/2" : ""}
          ${position === "left" ? "-right-1 top-1/2 -translate-y-1/2" : ""}
          ${position === "right" ? "-left-1 top-1/2 -translate-y-1/2" : ""}
        `}
                />
            </div>
        </div>
    )
}

export default function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setIsMenuOpen(false)
        }
    }

    const features = [
        {
            icon: <Bell className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Lightning Fast Alerts",
            description: "Get notified instantly when new deals drop. Never miss limited-time offers again.",
            color: "from-[#7F96FF] to-[#EB5E28]",
        },
        {
            icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Verified Deals Only",
            description: "All deals verified by our team. No fake offers, expired coupons, or scams.",
            color: "from-[#7F96FF] to-[#EB5E28]",
        },
        {
            icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Active Community",
            description: "Join thousands sharing tips, tricks, and exclusive finds daily.",
            color: "from-[#7F96FF] to-[#EB5E28]",
        },
        {
            icon: <Gift className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Exclusive Offers",
            description: "Access member-only deals and partnerships with top brands.",
            color: "from-[#7F96FF] to-[#EB5E28]",
        },
        {
            icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Premium Categories",
            description: "Organized categories: tech, fashion, gaming, and lifestyle.",
            color: "from-[#7F96FF] to-[#EB5E28]",
        },
        {
            icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Real-time Updates",
            description: "Live tracking with instant notifications and price monitoring.",
            color: "from-[#7F96FF] to-[#EB5E28]",
        },
    ]

    return (
        <div className="min-h-screen bg-[#090302] text-white overflow-x-hidden relative">
            <FlyingDollars/>
            {/* Navigation */}
            <motion.nav
                initial={{y: -60}}
                animate={{y: 0}}
                transition={{type: "spring", stiffness: 120, damping: 20}}
                className="fixed top-0 w-full z-40 bg-[#090302]/90 backdrop-blur-xl border-b border-[#EDF7F6]/20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        <motion.div whileHover={{scale: 1.02}} className="flex items-center space-x-3">
                            <Image src={"/1.png"} width={200} height={200} alt={"logo"}/>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {["Home", "Features", "About"].map((item) => (
                                <motion.button
                                    key={item}
                                    whileHover={{scale: 1.05, y: -2}}
                                    whileTap={{scale: 0.95}}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="text-sm font-semibold cursor-pointer text-[#BFC0C0] hover:text-white transition-all duration-300 relative group"
                                >
                                    {item}
                                    <motion.div
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7F96FF] group-hover:w-full transition-all duration-300"/>
                                </motion.button>
                            ))}

                            <Link href={"https://discord.gg/JTtaH6Bd"} target={"_blank"}>
                                <Tooltip content="Join our Discord community!" position="bottom">
                                    <motion.div
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        className="w-10 h-10 bg-[#7F96FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#001514]/30 cursor-pointer hover:shadow-xl hover:shadow-[#001514]/50 transition-all duration-300"
                                    >
                                        <DiscordIcon className="w-5 h-5 text-white"/>
                                    </motion.div>
                                </Tooltip>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-[#BFC0C0] hover:text-white transition-colors duration-300 p-2"
                            >
                                {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: "auto"}}
                            exit={{opacity: 0, height: 0}}
                            className="md:hidden bg-[#090302]/95 backdrop-blur-xl border-t border-[#EDF7F6]/20"
                        >
                            <div className="px-4 pt-4 pb-6 space-y-3">
                                {["Home", "Features", "About"].map((item) => (
                                    <motion.button
                                        key={item}
                                        whileHover={{x: 8}}
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        className="block w-full text-left cursor-pointer px-4 py-3 text-sm font-semibold text-[#BFC0C0] hover:text-white hover:bg-[#001514]/10 rounded-lg transition-all duration-300"
                                    >
                                        {item}
                                    </motion.button>
                                ))}
                                <div className="px-4 pt-2 flex items-center justify-center">
                                    <DisButton/>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
            {/* Enhanced Hero Section */}
            <section id="home"
                     className="relative min-h-screen flex items-center justify-center mt-4 px-4 sm:px-6 lg:px-8 pt-20">
                <div className="max-w-7xl mx-auto text-center z-10">
                    {/* Floating Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {Array.from({length: 6}).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 bg-gradient-to-r from-[#EB5E28] to-[#7F96FF] rounded-full"
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 2) * 40}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.5,
                                }}
                            />
                        ))}
                    </div>

                    {/* Main Title */}
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.5}}
                        className="mb-6"
                    >
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black flex items-center justify-center mb-4 leading-none">
                           <Image src={"/1.png"} height={400} width={400} alt={"logo"}/>
                        </h1>

                        <motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.8, delay: 0.8}}
                            className="relative"
                        >
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4">
                                <AnimatedGradientText colors={["#BFC0C0", "#EDF7F6", "#001514"]}>
                                    Ultimate Deals & Offers
                                </AnimatedGradientText>
                            </h2>

                            <div className="flex items-center justify-center space-x-3 text-base sm:text-lg">
                                <motion.div
                                    animate={{rotate: [0, 360]}}
                                    transition={{duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear"}}
                                >
                                    <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#7F96FF]"/>
                                </motion.div>
                                <span className="font-semibold text-[#EDF7F6]">Discord Server</span>
                                <motion.div
                                    animate={{rotate: [360, 0]}}
                                    transition={{duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear"}}
                                >
                                    <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#7F96FF]"/>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 1.2}}
                        className="text-base sm:text-xl lg:text-2xl mb-12 text-[#EDF7F6] max-w-5xl mx-auto leading-relaxed"
                    >
                        Join <AnimatedGradientText colors={["#001514", "#7F96FF"]}>thousands</AnimatedGradientText> of
                        savvy
                        shoppers discovering exclusive deals, limited-time offers, and insider discounts across all your
                        favorite
                        brands.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 1.5}}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16"
                    >
                            <DisButton/>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 1.8}}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
                    >
                        {[
                            {number: "50K+", label: "Active Members"},
                            {number: "$2M+", label: "Total Saved"},
                            {number: "24/7", label: "Deal Hunting"},
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{scale: 1.05, y: -5}}
                                className="bg-gradient-to-br from-[#001514]/10 to-[#7F96FF]/5 backdrop-blur-sm border border-[#EDF7F6]/20 rounded-2xl p-6 hover:border-[#EB5E28]/40 transition-all duration-300"
                            >
                                <div className="text-2xl sm:text-3xl font-black mb-2">
                                    <AnimatedGradientText>{stat.number}</AnimatedGradientText>
                                </div>
                                <div className="text-sm sm:text-base text-[#EDF7F6] font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6">
                            <AnimatedGradientText>Why Choose DedSec?</AnimatedGradientText>
                        </h2>
                        <p className="text-base sm:text-lg text-[#EDF7F6] max-w-3xl mx-auto leading-relaxed">
                            Experience the ultimate deals community with exclusive features designed for smart shoppers.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 50}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: index * 0.1}}
                                viewport={{once: true}}
                                whileHover={{scale: 1.03, y: -5}}
                                className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#001514]/10 to-[#7F96FF]/5 backdrop-blur-sm border border-[#EDF7F6]/20 hover:border-[#EB5E28]/40 transition-all duration-400"
                            >
                                <div
                                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <div className="text-white">{feature.icon}</div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#BFC0C0] group-hover:text-white transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                <p className="text-sm sm:text-base text-[#EDF7F6] group-hover:text-[#BFC0C0] transition-colors duration-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                    >
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-12">
                            <AnimatedGradientText>About DedSec</AnimatedGradientText>
                        </h2>

                        <div
                            className="space-y-6 sm:space-y-8 text-base sm:text-lg text-[#EDF7F6] leading-relaxed mb-12">
                            <motion.p
                                initial={{opacity: 0, x: -50}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{duration: 0.8, delay: 0.2}}
                                viewport={{once: true}}
                            >
                                DedSec started as a small community of deal enthusiasts who were tired of missing out on
                                the best offers
                                online. What began as a simple Discord server has grown into the ultimate destination
                                for savvy shoppers
                                worldwide.
                            </motion.p>

                            <motion.p
                                initial={{opacity: 0, x: 50}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{duration: 0.8, delay: 0.4}}
                                viewport={{once: true}}
                            >
                                Our dedicated team works around the clock to curate, verify, and share the most valuable
                                deals across
                                all categories. From electronics and fashion to home goods and travel, we&#39;ve got you
                                covered.
                            </motion.p>

                            <motion.p
                                initial={{opacity: 0, y: 50}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: 0.6}}
                                viewport={{once: true}}
                            >
                                Join our community today and start saving on everything you love. With real-time
                                notifications,
                                exclusive partnerships, and a supportive community of fellow deal hunters, you&#39;ll
                                never pay full price
                                again.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            whileInView={{opacity: 1, scale: 1}}
                            transition={{duration: 0.8, delay: 0.8}}
                            viewport={{once: true}}
                        >
                            <DisButton/>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="relative bg-[#090302]/95 backdrop-blur-xl border-t border-[#EDF7F6]/20 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                        <motion.div whileHover={{scale: 1.02}} className="flex items-center space-x-3">
                            <Image src={"/1.png"} width={200} height={200} alt={"logo"}/>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
                            <p className="text-sm text-[#EDF7F6] text-center md:text-left">© 2024 DedSec. All rights
                                reserved.</p>
                            <div className="flex space-x-6 sm:space-x-8">
                                {["Home", "Features", "About"].map((item) => (
                                    <motion.button
                                        key={item}
                                        whileHover={{scale: 1.05, y: -2}}
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        className="text-sm cursor-pointer text-[#BFC0C0] hover:text-white transition-colors duration-300 font-semibold"
                                    >
                                        {item}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
