import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: 'hsl(var(--surface))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				chakra: {
					root: 'hsl(var(--chakra-root))',
					sacral: 'hsl(var(--chakra-sacral))',
					solar: 'hsl(var(--chakra-solar))',
					heart: 'hsl(var(--chakra-heart))',
					throat: 'hsl(var(--chakra-throat))',
					'third-eye': 'hsl(var(--chakra-third-eye))',
					crown: 'hsl(var(--chakra-crown))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-cosmic': 'var(--gradient-cosmic)',
				'gradient-chakra-glow': 'var(--gradient-chakra-glow)',
				'gradient-meditation': 'var(--gradient-meditation)'
			},
			boxShadow: {
				'chakra': 'var(--shadow-chakra)',
				'elevation': 'var(--shadow-elevation)',
				'glow': 'var(--glow-active)'
			},
			transitionProperty: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)',
				'breath': 'var(--transition-breath)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'sparkle': {
					'0%, 100%': { opacity: '0', transform: 'scale(0)' },
					'50%': { opacity: '1', transform: 'scale(1)' }
				},
				'breath-in': {
					'0%': { transform: 'scale(1)', opacity: '0.7' },
					'100%': { transform: 'scale(1.1)', opacity: '1' }
				},
				'breath-out': {
					'0%': { transform: 'scale(1.1)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '0.7' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 5px currentColor' },
					'50%': { boxShadow: '0 0 25px currentColor, 0 0 35px currentColor' }
				},
				'expand-chakra': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(50)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'breath-in': 'breath-in 5s ease-in-out',
				'breath-out': 'breath-out 5s ease-in-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'expand-chakra': 'expand-chakra 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
