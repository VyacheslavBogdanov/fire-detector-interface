<!-- <template>
	<div>
		<div
			v-for="(type, index) in filteredMessageTypes"
			:key="index"
			:class="['health', type.class]"
		>
			<div class="health__icon">ⓘ</div>
			<span>{{ type.message }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useHealthCheck } from './useHealthCheck';
import type { MessageType } from '../utils/types';

// Пропсы
const props = defineProps<{
	messageTypes: MessageType[];
}>();

// События
const emit = defineEmits<{
	(event: 'onStatusChange', status: string): void;
}>();

// Подключаем health check
const { status } = useHealthCheck();

// Логирование статуса для проверки
watch(status, (newStatus) => {
	console.log('NEW STATUS', newStatus);
	emit('onStatusChange', newStatus);
});

// Вычисляемое свойство
const filteredMessageTypes = computed(() => {
	console.log('Filtered message types recalculated for status:', status.value);
	if (status.value === 'active') {
		return props.messageTypes.filter((type) => type.class === 'health--success');
	}
	return props.messageTypes.filter((type) => type.class === 'health--warning');
});
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

.health {
	position: relative;
	display: flex;
	align-items: center;
	padding: 10px 30px 10px 40px;
	border-radius: $border-radius;
	max-width: fit-content;
	word-wrap: break-word;
	font-size: 23px;
	height: 40px;
	opacity: 0.85;
	margin: 20px 0;

	@media (max-width: 835px) {
		font-size: 17px;
	}

	&__icon {
		display: flex;
		position: absolute;
		transform: rotate(180deg);
		left: 10px;
		height: 30px;
	}

	&--success {
		background-color: #e0fde7;
		color: $color-success;
	}

	&--warning {
		background-color: #f9ebd8;
		color: $color-warning;
	}
}
</style> -->

<template>
	<div>
		<h2>Статус системы</h2>
		<p :class="statusClass">{{ statusMessage }}</p>
		<ul>
			<li v-for="type in filteredMessageTypes" :key="type.class">
				{{ type.message }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import type { MessageType } from '../utils/types';

const props = defineProps<{
	messageTypes: MessageType[];
}>();
const emit = defineEmits(['onStatusChange']);

const status = computed(() => {
	return props.messageTypes.some((type) => type.class === 'error') ? 'inactive' : 'active';
});

const filteredMessageTypes = computed(() => {
	return props.messageTypes.filter((type) => type.class !== 'debug');
});

const statusClass = computed(() => {
	return status.value === 'active' ? 'status-active' : 'status-inactive';
});

const statusMessage = computed(() => {
	return status.value === 'active' ? 'Система активна' : 'Система неактивна';
});

watch(status, (newStatus) => {
	emit('onStatusChange', newStatus);
});
</script>

<style scoped>
.status-active {
	color: green;
}

.status-inactive {
	color: red;
}
</style>
