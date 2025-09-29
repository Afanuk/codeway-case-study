<template>
  <div class="parameter-card">
    <div class="card-body">
      <div class="parameter-info">
        <div class="info-item">
          <span class="label">Parameter Key:</span>
          <span class="value">{{ parameter.parameterKey }}</span>
        </div>
        <div class="info-item">
          <span class="label">Value:</span>
          <span class="value">{{ parameter.value }}</span>
        </div>
        <div class="info-item">
          <span class="label">Description:</span>
          <span class="value">{{ parameter.description }}</span>
        </div>
        <div class="info-item">
          <span class="label">Create Date:</span>
          <span class="value">{{ formatDate(parameter.createdAt) }}</span>
        </div>
      </div>
      <div class="card-actions">
        <button @click="$emit('edit', parameter)" class="btn btn-edit">Edit</button>
        <button @click="$emit('delete', parameter)" class="btn btn-delete">Del</button>
      </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Parameter } from '../types/parameter'

defineProps<{
  parameter: Parameter
}>()

defineEmits<{
  edit: [parameter: Parameter]
  delete: [parameter: Parameter]
}>()

const formatDate = (dateString: Date | undefined) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.parameter-card {
  border-radius: 12px;
  padding: 0.5rem;
  padding-left: 1rem;
  margin: 1rem;
  border: 1px solid #ffffff;
  margin-top: 0;
}

.card-body {
  margin-top: 0rem;
}

.parameter-info {
  margin-bottom: 0.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  padding: rem 0;
}

.label {
  color: #ffffff;
  font-weight: 500;
}

.value {
  color: #9ca3af;
  text-align: left;
  flex: 1;
  margin-left: 1rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  justify-content:center;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 3rem;
  height: 2rem;
  padding: 0%;
}

.btn-edit {
  background: linear-gradient(270deg, #4f7fe7 0%, #2563eb 100%);
  color: white;
}

.btn-edit:hover {
  background: linear-gradient(270deg, #2563eb 0%, #1047bd 100%);
}

.btn-delete {
  background: linear-gradient(270deg, #dd3e3e 0%, #991b1b 100%);
  color: white;
}

.btn-delete:hover {
  background: linear-gradient(270deg, #991b1b 0%, #7f1d1d 100%);
}
</style>
