import type { ProcessingInstance } from '@/types';
import { PROCESSING_LOCALSTORAGE_KEY } from '@/utils';
import { ProcessingLocation, StatusCode } from '@/utils/enums';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { startProcessing, endProcessing } from '@/utils/processing';
import { generateProcessingInstance } from '@/utils/generators/generateInstance';
import { readStateFromLocalStorage } from '@/utils';

type ProcessingRecord = {
  instance: ProcessingInstance;
  status: StatusCode;
  message?: string;
};
type ProcessingData = Partial<Record<ProcessingLocation, ProcessingRecord>>;

export const useProcessingManagerStore = defineStore('processingManager', () => {
  // Initialize internal data structures
  const _data: Ref<ProcessingData> = ref({});
  // Try to recover data from localStorage
  const _recoveredData = ref(readStateFromLocalStorage(PROCESSING_LOCALSTORAGE_KEY));

  // Interactions
  function addInstance(newInstance: ProcessingInstance) {
    if (_data.value[newInstance.location]) {
      console.error(`Error: ProcessingInstance already exists at ${newInstance.location}`);
      return;
    }

    _data.value[newInstance.location] = {
      instance: newInstance,
      status: StatusCode.Ok,
    };
    startProcessing(newInstance.location);
  }

  async function removeInstanceByLocation(loc: ProcessingLocation) {
    endProcessing(loc);
    delete _data.value[loc];
  }

  function restartRecoveredInstances() {
    if (_recoveredData.value === undefined) {
      return;
    }
    Object.entries(_recoveredData.value).forEach(([location, record]) => {
      // If the recovered data includes valid locations
      if (Object.values<string>(ProcessingLocation).includes(location)) {
        const newInstance = generateProcessingInstance(
          (record as ProcessingRecord).instance as ProcessingInstance,
        );
        addInstance(newInstance);
      } else {
        console.warn("Found localStorageData that didn't match the expected data structure");
      }
    });
  }

  function getInstance(location: ProcessingLocation) {
    const record = _data.value[location];
    return record?.instance;
  }

  function getStatus(location: ProcessingLocation) {
    const record = _data.value[location];
    if (record === undefined) {
      console.error(`Error: location ${location} does not have a record`);
      return;
    }
    return record.status;
  }

  function setStatus(location: ProcessingLocation, newStatus: StatusCode) {
    const record = _data.value[location];
    if (record === undefined) {
      console.error(`Error: location ${location} does not have a record`);
      return;
    }
    record.status = newStatus;
  }

  return {
    _data,
    addInstance,
    removeInstanceByLocation,
    restartRecoveredInstances,
    getInstance,
    getStatus,
    setStatus,
  };
});
