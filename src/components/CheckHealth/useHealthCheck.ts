// import { ref, onMounted, onUnmounted } from 'vue';

// export function useHealthCheck() {
// 	const status = ref<'active' | 'inactive'>('inactive');
// 	let interval: number;

// 	const checkHealth = async () => {
// 		try {
// 			const response = await fetch('http://81.94.156.176:5011/health');

// 			if (response.ok) {
// 				const data = await response.json();

// 				console.log(data);

// 				if (data.result === 1) {
// 					status.value = 'active';
// 				} else {
// 					status.value = 'inactive';
// 				}
// 			} else {
// 				console.error('Ошибка ответа от сервера:', response.status);
// 				status.value = 'inactive';
// 			}
// 		} catch (error) {
// 			console.error('Ошибка подключения:', error);
// 			status.value = 'inactive';
// 		}
// 	};

// 	const startHealthCheck = () => {
// 		checkHealth();
// 		interval = setInterval(checkHealth, 15000);
// 	};

// 	const stopHealthCheck = () => {
// 		clearInterval(interval);
// 	};

// 	onMounted(startHealthCheck);
// 	onUnmounted(stopHealthCheck);

// 	return { status };
// }
import { ref, onMounted, onUnmounted } from 'vue';

export function useHealthCheck() {
	const status = ref<'active' | 'inactive'>('inactive');
	let interval: number | undefined;

	const checkHealth = async () => {
		try {
			const response = await fetch('http://81.94.156.176:5011/health');

			if (response.ok) {
				const data = await response.json();

				// const data = await { result: 0 };
				console.log('DATA', data);

				const result = Number(data?.result);

				if (result === 1) {
					console.log('Setting status to active');
					status.value = 'active';
				} else {
					console.log('Setting status to inactive');
					status.value = 'inactive';
				}
			} else {
				console.error('Ошибка ответа от сервера:', response.status);
				status.value = 'inactive';
			}
		} catch (error) {
			console.error('Ошибка подключения:', error);
			status.value = 'inactive';
		}

		console.log('Current status:', status.value);
	};

	const startHealthCheck = () => {
		checkHealth();
		interval = window.setInterval(checkHealth, 15000);
	};

	const stopHealthCheck = () => {
		if (interval !== undefined) {
			clearInterval(interval);
			interval = undefined;
		}
	};

	onMounted(() => {
		startHealthCheck();
	});

	onUnmounted(() => {
		stopHealthCheck();
	});

	return { status };
}
