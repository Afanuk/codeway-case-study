<template>
  <div v-if="visible" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Edit Parameter</h3>
        <button @click="$emit('close')" class="modal-close">×</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Parameter Key:</label>
          <input 
            v-model="localParameter.parameterKey" 
            type="text" 
            :class="{ 'invalid': !isParameterKeyValid }"
          />
          <span v-if="!isParameterKeyValid" class="error-message">Parameter Key is required!</span>
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input v-model="localParameter.description" type="text" />
        </div>
        
        <!-- Default Value -->
        <div class="form-group">
          <label>Default Value:</label>
          <input 
            v-model="localParameter.value.default" 
            type="text"
            :class="{ 'invalid': !isParameterDefaultValueValid }"  
          />
          <span v-if="!isParameterDefaultValueValid" class="error-message">Default Value is required!</span>
        </div>

        <!-- Country-specific Values -->
        <div class="form-group">
          <label>Country-specific Values:</label>
          <div class="country-values">
            <div v-for="(value, country) in countryValues" :key="country" class="country-item">
              <span class="country-code">{{ country.toUpperCase() }}:</span>
              <input v-model="localParameter.value[country]" type="text" class="country-input"/>
              <button @click="removeCountry(country)" class="btn-remove">×</button>
            </div>
          </div>
          
          <!-- Add new country -->
          <div class="add-country">
            <select v-model="newCountryCode" class="country-select">
              <option value="">Select Country</option>
              <option v-for="country in unusedCountries" :key="country" :value="country">
                {{ country.toUpperCase() }}
              </option>
            </select>
            <input v-model="newCountryValue" placeholder="Value" class="country-input" />
            <button @click="addCountry" class="btn-add-country">ADD</button>
          </div>
        </div>        
      </div>
      <div class="modal-footer">
        <button @click="handleSave" class="btn btn-save" :disabled="!isFormValid">Save</button>
        <button @click="$emit('close')" class="btn btn-cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Parameter } from '../types/parameter'

interface Props {
  visible: boolean
  parameter: Parameter | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  save: [Parameter]
}>()

const localParameter = ref<Parameter> ({
  id: '',
  parameterKey: '',
  value: { default: '' },
  description: ''
})

// Country management
const newCountryCode = ref('')
const newCountryValue = ref('')

// Countries list 
const availableCountries = ref(['TR', 'US', 'UK', 'DE', 'FR', 'ES', 'IT'])

// Computed property to get current country values
const countryValues = computed(() => {
  const countries: Record<string, string | number | boolean> = {}
  Object.keys(localParameter.value.value).forEach(key => {
    if (key !== 'default') {
      countries[key] = localParameter.value.value[key]
    }
  })
  return countries
})

// Computed property to get countries not yet used
const unusedCountries = computed(() => {
  const usedCountries = Object.keys(localParameter.value.value).filter(key => key !== 'default')
  return availableCountries.value.filter(country => !usedCountries.includes(country))
})

// Validation computed property for Key
const isParameterKeyValid = computed(() => {
  return localParameter.value.parameterKey.trim() !== ''
})

// Validation computed property for Default Value
const isParameterDefaultValueValid = computed(() => {
  return localParameter.value.value.default.toString().trim() !== ''
})

// Overall form validation
const isFormValid = computed(() => {
  return isParameterKeyValid.value && isParameterDefaultValueValid.value
})

// Functions for country management
const addCountry = () => {
  if (newCountryCode.value && newCountryValue.value) {
    localParameter.value.value[newCountryCode.value] = newCountryValue.value
    newCountryCode.value = ''
    newCountryValue.value = ''
  }
}

const removeCountry = (countryCode: string) => {
  delete localParameter.value.value[countryCode]
}

// Watch for changes in the parameter prop
watch(() => props.parameter, (newParameter) => {
  if (newParameter) {
    localParameter.value = { ...newParameter }
  }
}, { immediate: true })

// Watch for modal visibility changes
watch(() => props.visible, (isVisible) => {
  if (!isVisible) {
    // Clean up when modal closes
    newCountryCode.value = ''
    newCountryValue.value = ''
    localParameter.value = {
      id: '',
      parameterKey: '',
      value: { default: '' },
      description: ''
    }
  } else if (isVisible && props.parameter) {
    // Ensure data is fresh when opening
    localParameter.value = { ...props.parameter }
  }
}, { immediate: true, deep: true })

const handleSave = () => {
  if (!isFormValid.value) {
    alert('Please fill in all required fields!')
    return
  }
  emit('save', localParameter.value)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(180deg, #1a1930 0%, #161524 100%);
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.modal-header h3 {
  margin: 0;
  color: #94A3B8;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.modal-close:hover {
  color: #000;
}

.modal-body {
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #94A3B8;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: 0.1rem solid rgba(47, 117, 209, 0.308);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 0.875rem;
  color: #ffffff;
}

.form-group input:focus {
  outline: none;
  border-color: #b32ca7;
}

.modal-footer {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  justify-content: flex-end;
}

.btn {
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-save {
  background: linear-gradient(270deg, #4f7fe7 0%, #2563eb 100%);
}

.btn-save:hover {
  background: linear-gradient(270deg, #2563eb 0%, #1047bd 100%);
}

.btn-cancel {
  background: linear-gradient(270deg, #f75c5c 0%, #c03434 100%);  
}

.btn-cancel:hover {
  background: linear-gradient(270deg, #9e2a2a 0%, #7f1d1d 100%);
}

.country-values {
  margin-bottom: 1rem;
}

.country-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.country-code {
  min-width: 40px;
  font-weight: bold;
  color: #94A3B8;
}

.country-input {
  flex: 1;
  padding: 0.3rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(47, 117, 209, 0.308);
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.875rem;
}

.country-input:focus {
  outline: none;
  border-color: #b32ca7;
}

.btn-remove {
  background: linear-gradient(270deg, #f75c5c 0%, #c03434 100%);
  color: white;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.btn-remove:hover {
  background: linear-gradient(270deg, #9e2a2a 0%, #7f1d1d 100%);
}

.add-country {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  border: 1px dashed rgba(47, 117, 209, 0.308);
}

.country-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(47, 117, 209, 0.308);
  border-radius: 4px;
  color: #ffffff;
  padding: 0.3rem 0.5rem;
  font-size: 0.875rem;
}

.country-select:focus {
  outline: none;
  border-color: #b32ca7;
}

.country-select option {
  background: #1f2937;
  color: #ffffff;
}

.btn-add-country {
  background: linear-gradient(270deg, #13ceb5 0%, #07706b 100%);
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;
}

.btn-add-country:hover {
  background: linear-gradient(270deg, #07706b 0%, #035753 100%);
}

/* Validation styles */
.invalid {
  border-color: #f75c5c !important;
  background-color: rgba(247, 92, 92, 0.1) !important;
}

.error-message {
  color: #f75c5c;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(270deg, #666 0%, #444 100%) !important;
}

.btn:disabled:hover {
  background: linear-gradient(270deg, #666 0%, #444 100%) !important;
}

@media (max-width: 48em) {
  .modal-content {
    border: 1px solid #ffffff;
    border-radius: 12px;
    max-width: 80%;
    max-height: 60%;
  }
}

</style>