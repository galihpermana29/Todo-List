if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((reg) => console.log('berhasil registrasi sw'))
		.catch((reg) => console.log('gagal registrasi sw'));
}
