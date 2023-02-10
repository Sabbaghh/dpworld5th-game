import '@/styles/globals.css';
// import { Roboto } from '@next/font/google';

// const roboto = Roboto({
// 	subsets: ['latin'],
// 	weight: ['700'],
// });
export default function App({ Component, pageProps }) {
	return (
		// <main className={roboto.className}>
		<Component {...pageProps} />
		// </main>
	);
}
