<template>
  <div class="parameter-manager">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <img class="logo-icon" src="/src/assets/icon.png" alt="Logo"/>
      </div>
      <div class="user-menu">
        <div class="user-dropdown" :class="{ 'active': isDropdownOpen }">
          <button @click="toggleDropdown" class="user-avatar">
            <IconUserFilled :size="32" color="white" stroke="3"/>
            <IconCaretDownFilled :size="16" color="white" stroke="3" style="align-self: center;"/>
          </button>
          
          <!-- Dropdown Menu -->
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <button class="dropdown-item profile-item">
              <span>Profile</span>
            </button>
            <button @click="handleLogout" class="dropdown-item logout-item">
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Table View -->
    <div class="desktop-view">
      <div class="table-container">
        <table class="parameter-table">
          <thead>
            <tr class="parameter-header-row">
              <th>Parameter Key</th>
              <th>Value</th>
              <th>Description</th>
              <th>
                <button @click="toggleSort" class="sort-button">
                  Create Date {{ sortDirection === 'desc' ? '↓' : '↑' }}
                </button>
              </th>
              <th style="width: 140px; font-size: large;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="parameter in parameters" :key="parameter.id" class="parameter-row">
              <td class="key-cell">
                <input 
                  v-if="editingId === parameter.id" 
                  v-model="editForm.parameterKey" 
                  class="edit-input"
                  @keyup.enter="saveParameter"
                  @keyup.escape="cancelEdit"
                />
                <span v-else>{{ parameter.parameterKey }}</span>
              </td>
              <td class="value-cell">
                <input 
                  v-if="editingId === parameter.id" 
                  v-model="editForm.value" 
                  class="edit-input"
                  @keyup.enter="saveParameter"
                  @keyup.escape="cancelEdit"
                />
                <span v-else>{{ parameter.value }}</span>
              </td>
              <td class="description-cell">
                <input 
                  v-if="editingId === parameter.id" 
                  v-model="editForm.description" 
                  class="edit-input edit-input-wide"
                  @keyup.enter="saveParameter"
                  @keyup.escape="cancelEdit"
                />
                <span v-else>{{ parameter.description }}</span>
              </td>
              <td class="date-cell">{{ formatDate(parameter.createdAt) }}</td>
              <td class="actions-cell">
                <template v-if="editingId === parameter.id">
                  <button @click="saveParameter" class="btn btn-edit">Save</button>
                  <button @click="cancelEdit" class="btn btn-delete">Cancel</button>
                </template>
                <template v-else>
                  <button @click="editParameter(parameter)" class="btn btn-edit">Edit</button>
                  <button @click="deleteParameter(parameter)" class="btn btn-delete">Delete</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add New Parameter Form -->
      <div class="add-form">
        <div class="form-row">
          <input 
            v-model="newParameter.parameterKey" 
            placeholder="New Parameter" 
            class="form-input"
          />
          <input 
            v-model="newParameter.value" 
            placeholder="Value" 
            class="form-input"
          />
          <input 
            v-model="newParameter.description" 
            placeholder="New Description" 
            class="form-input description-input"
          />
          <button @click="addParameter" class="btn btn-add">ADD</button>
        </div>
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="mobile-view">
      <ParameterCard 
        v-for="parameter in parameters" 
        :key="parameter.id"
        :parameter="parameter"
        @edit="editParameter"
        @delete="deleteParameter"
      />
      
      <!-- Mobile Add Form -->
      <div class="mobile-add-form">
        <h3>Add New Parameter</h3>
        <input 
          v-model="newParameter.parameterKey" 
          placeholder="Parameter Key" 
          class="form-input form-input-key"
        />
        <input 
          v-model="newParameter.value" 
          placeholder="Value" 
          class="form-input form-input-value"
        />
        <input 
          v-model="newParameter.description" 
          placeholder="Description" 
          class="form-input form-input-description"
        />
        <button @click="addParameter" class="btn btn-add">ADD</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconUserFilled, IconCaretDownFilled, IconCaretDown } from '@tabler/icons-vue'
import { ref, onMounted } from 'vue'
import type { Parameter } from '../types/parameter'
import { parameterPanelService } from '../services/parameterPanelService'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import ParameterCard from './ParameterCard.vue'

const { user, logout } = useAuth()
const router = useRouter()
const parameters = ref<Parameter[]>([])
const loading = ref(false)
const sortDirection = ref<'asc' | 'desc'>('desc')
const isDropdownOpen = ref(false)
const editingId = ref<string | null>(null)

const editForm = ref({
  parameterKey: '',
  value: '',
  description: ''
})

const newParameter = ref({
  parameterKey: '',
  value: '',
  description: ''
})

const formatDate = (date: Date | undefined) => {
  if (!date) return 'N/A'
  
  // Date should already be a proper Date object from service
  const dateStr = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  
  const timeStr = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  })
  
  return `${dateStr} ${timeStr}`
}

const toggleSort = () => {
  sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
  sortParameters()
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const sortParameters = () => {
  parameters.value.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime()
    const dateB = new Date(b.createdAt || 0).getTime()
    return sortDirection.value === 'desc' ? dateB - dateA : dateA - dateB
  })
}

const loadParameters = async () => {
  try {
    loading.value = true
    parameters.value = await parameterPanelService.getAllParametersPanel()
    sortParameters()
    sortParameters()
  } catch (error) {
    console.error('Error loading parameters:', error)
  } finally {
    loading.value = false
  }
}

const addParameter = async () => {
  if (!newParameter.value.parameterKey || !newParameter.value.value) {
    alert('Parameter key and value are required')
    return
  }

  try {
    await parameterPanelService.createParameter(newParameter.value)
    newParameter.value = { parameterKey: '', value: '', description: '' }
    await loadParameters()
  } catch (error) {
    console.error('Error adding parameter:', error)
    alert('Failed to add parameter')
  }
}

const editParameter = (parameter: Parameter) => {
  editingId.value = parameter.id
  editForm.value = {
    parameterKey: parameter.parameterKey,
    value: parameter.value,
    description: parameter.description || ''
  }
}

const saveParameter = async () => {
  if (!editForm.value.parameterKey || !editForm.value.value) {
    alert('Parameter key and value are required')
    return
  }

  try {
    const updatedParameter = {
      id: editingId.value!,
      parameterKey: editForm.value.parameterKey,
      value: editForm.value.value,
      description: editForm.value.description
    }

    await parameterPanelService.updateParameter(editingId.value!, updatedParameter)
    editingId.value = null
    editForm.value = { parameterKey: '', value: '', description: '' }
    await loadParameters()
  } catch (error) {
    console.error('Error updating parameter:', error)
    alert('Failed to update parameter')
  }
}

const cancelEdit = () => {
  editingId.value = null
  editForm.value = { parameterKey: '', value: '', description: '' }
}

const deleteParameter = async (parameter: Parameter) => {
  if (!confirm(`Are you sure you want to delete "${parameter.parameterKey}"?`)) {
    return
  }

  try {
    await parameterPanelService.deleteParameter(parameter.id)
    await loadParameters()
  } catch (error) {
    console.error('Error deleting parameter:', error)
    alert('Failed to delete parameter')
  }
}

const handleLogout = async () => {
  try {
    await logout()
    router.push('/SignIn')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

onMounted(() => {
  loadParameters()
})
</script>

<style scoped>
.parameter-manager {
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1930 0%, #161524 100%);
  color: #ffffff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo-icon {
  width: 75px;
  height: 46px;
  border-radius: 8px;
}

.user-menu {
  align-items: center;
  gap: 1rem;
  position: relative;
}

.user-dropdown {
  position: relative;
}

.user-avatar {
  background: none;
  border: none;
  display: flex;
  cursor: pointer;
  transition: all 0.2s;
}

.user-avatar:hover {
  opacity: 0.8;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  min-width: 120px;
  z-index: 1000;
  margin-top: 8px;
}

.dropdown-item {
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  color: #e5e7eb;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 6px;
}

.dropdown-item:hover {
  background: #374151;
}

.logout-item:hover {
  background: #ef4444;
  color: white;
}

.desktop-view {
  padding: clamp(1rem, 3vw, 2rem);
}

.mobile-view {
  display: none;
}

.table-container {
  border-radius: 12px;
}

.parameter-table {
  width: 95%;
  border-collapse: collapse;
}

.parameter-table th {
  color: #94A3B8;
  padding: 0.5rem;
  text-align: left;
  font-weight: 500;
  font-size: 1.5rem;
  white-space: nowrap;
}

.sort-button {
  background: none;
  border: none;
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.parameter-table td {
  padding: 0.3rem;
  border: none;
  color: #ffffff;
  font-size: 0.875rem;
}

.parameter-row {
  transition: background 0.2s;
}

.parameter-row:hover {
  background: rgba(58, 61, 74, 0.3);
}

.key-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 17.5%;
}

.value-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 17.5%;
}

.description-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 35%;
}

.date-cell {
  color: #9ca3af;
  font-size: 0.875rem;
}

.actions-cell {
  white-space: nowrap;
}

.btn {
  padding: 0.3rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 1rem;
}

.btn-edit {
  background: linear-gradient(270deg, #4f7fe7 0%, #2563eb 100%);
  color: white;
  min-width: 60px;
}

.btn-edit:hover {
  background: linear-gradient(270deg, #2563eb 0%, #1047bd 100%);
}

.btn-delete {
  background: linear-gradient(270deg, #f75c5c 0%, #c03434 100%);
  color: white;
  min-width: 60px;
}

.btn-delete:hover {
  background: linear-gradient(270deg, #9e2a2a 0%, #7f1d1d 100%);
}

.btn-add {
  background: linear-gradient(270deg, #13ceb5 0%, #07706b 100%);
  color: white;
  font-weight: 600;
  margin-right: 6.5rem;
  margin-left: 1rem;
  max-width: 3.5rem;
  width: 4.5rem;
  height: 2rem;
  padding: 0%;
}

.btn-add:hover {
  background: linear-gradient(270deg, #07706b 0%, #035753 100%);
}

.btn-save {
  background: linear-gradient(270deg, #22c55e 0%, #16a34a 100%);
  color: white;
  min-width: 60px;
}

.btn-save:hover {
  background: linear-gradient(270deg, #16a34a 0%, #15803d 100%);
}

.btn-cancel {
  background: linear-gradient(270deg, #6b7280 0%, #4b5563 100%);
  color: white;
  min-width: 60px;
}

.btn-cancel:hover {
  background: linear-gradient(270deg, #4b5563 0%, #374151 100%);
}

.edit-input {
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 4px;
  padding: 0.4rem;
  color: #ffffff;
  font-size: 0.875rem;
  width: 100%;
  box-sizing: border-box;
}

.edit-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.edit-input-wide {
  min-width: 200px;
}

.add-form {
  border-radius: 12px;
}

.form-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 94.5%;
}

@media (max-width: 64em) {
  .form-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-row .form-input,
  .form-row .btn {
    width: 100%;
  }
}

.form-input {
  background: none;
  border: 0.1rem solid rgba(47, 117, 209, 0.308);
  border-radius: 6px;
  padding: 0.6rem;
  color: #ffffff;
  font-size: 0.875rem;
  width: 17.5%;
  margin-right: 1.2rem;
}

.description-input {
  width: 57.5%;
}

.form-input::placeholder {
  color: #6b7280;
}

.form-input:focus {
  outline: none;
  border-color: #b32ca7;
}

.mobile-add-form {
  border: 1px solid #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem;
}

.mobile-add-form h3 {
  text-align: center;
  margin: 0 0 1rem 0;
  color: #ffffff;
}

.mobile-add-form .form-input {
  display: block;
  width: 100%;
}

.mobile-add-form .form-input-key {
  margin-bottom: 0rem;
  border-bottom-left-radius: 0%;
  border-bottom-right-radius: 0%;
}

.mobile-add-form .form-input-value {
  margin-bottom: 0rem;
  border-radius: 0%;
}

.mobile-add-form .form-input-description {
  margin-bottom: 1rem;
  border-top-left-radius: 0%;
  border-top-right-radius: 0%;
}

.mobile-add-form .btn-add {
  width: 100%;
}

@media (max-width: 48em) {
  .desktop-view {
    display: none;
  }
  
  .mobile-view {
    display: block;
  }

  .btn-add {
    margin-left: 35vw;
    width: 100%;
  }
  
  .header {
    padding: 1rem;
  }
}
</style>
