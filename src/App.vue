<!-- <template>
	<h1 class="title">Детектор огня</h1>
	<div id="app">
		<CheckHealth :messageTypes="messageTypes" @onStatusChange="updateStatus" />
		<FireDetection :messageTypes="messageTypes" :isDetectorActive="isDetectorActive" />
	</div>
</template>

<script setup lang="ts">
import CheckHealth from '@/components/CheckHealth/CheckHealth.vue';
import FireDetection from '@/components/FireDetection/FireDetection.vue';
import { ref, onMounted } from 'vue';
import { fetchData } from './components/mocks/db';
import type { MessageType } from './components/utils/types.ts';

const messageTypes = ref<MessageType[]>([]);
const isDetectorActive = ref<boolean>(false);

const loadMessageTypes = async () => {
	try {
		messageTypes.value = await fetchData('/message-types');
	} catch (error) {
		console.error('Ошибка загрузки:', error);
	}
};

const updateStatus = (status: string) => {
	console.log('STATUS', status);

	if (status === 'active') {
		isDetectorActive.value = true;
	} else {
		isDetectorActive.value = false;
	}
};

console.log('isDetectorActive', isDetectorActive.value);

onMounted(loadMessageTypes);
</script>

<style lang="scss" scoped>
@import './styles/main.scss';

.title {
	margin: 1%;
	color: rgba(100, 95, 95, 0.711);
}

#app {
	width: 40%;
	height: 500px;
	display: flex;
	align-items: center;
	flex-direction: column;
	font-family: sans-serif;
	background-color: $color-bg;
	margin: 1%;
	padding: 20px;
	border: $border-width solid $border-color;
	border-radius: $border-radius;
}
</style> -->

<template>
	<h1 class="title">Детектор огня</h1>
	<div id="app">
		<CheckHealth :messageTypes="messageTypes" @onStatusChange="updateStatus" />
		<FireDetection :messageTypes="messageTypes" :isDetectorActive="isDetectorActive" />
	</div>
</template>

<script setup lang="ts">
import CheckHealth from '@/components/CheckHealth/CheckHealth.vue';
import FireDetection from '@/components/FireDetection/FireDetection.vue';
import { ref, onMounted } from 'vue';
import { fetchData } from './components/mocks/db';
import type { MessageType } from './components/utils/types';

const messageTypes = ref<MessageType[]>([]);
const isDetectorActive = ref<boolean>(false);

const loadMessageTypes = async () => {
	try {
		messageTypes.value = await fetchData('/message-types');
	} catch (error) {
		console.error('Ошибка загрузки:', error);
		messageTypes.value = []; // Fallback на случай ошибки
	}
};

const updateStatus = (status: string) => {
	isDetectorActive.value = status === 'active';
};

onMounted(loadMessageTypes);
</script>

<style lang="scss" scoped>
@import './styles/main.scss';

.title {
	margin: 1%;
	color: rgba(100, 95, 95, 0.711);
}

#app {
	width: 40%;
	height: 500px;
	display: flex;
	align-items: center;
	flex-direction: column;
	font-family: sans-serif;
	background-color: $color-bg;
	margin: 1%;
	padding: 20px;
	border: $border-width solid $border-color;
	border-radius: $border-radius;
}
</style>
