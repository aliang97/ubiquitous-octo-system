import type { ProcessingInstance } from '@/types';
import { PROCESSING_LOCALSTORAGE_KEY } from '@/utils';
import { ProcessingLocation, StatusCode } from '@/utils/enums';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { startProcessing, endProcessing } from '@/utils/processing';
import { generateProcessingInstance } from '@/utils/generators/generateInstance';

type ProcessingRecord = {
  instance: ProcessingInstance;
  status: StatusCode;
  message?: string;
};
type ProcessingData = Partial<Record<ProcessingLocation, ProcessingRecord>>;

export const useProcessingManagerStore = defineStore('processingManager', () => {
  // Try to recover data from localStorage
  let _recovered: ProcessingData = {};
  const localStorageData = localStorage.getItem(PROCESSING_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    _recovered = recoveredState._recordsByLocation;
  }
  const _recoveredData = ref(_recovered);

  // Initialize internal data structures
  const _data: ProcessingData = {};
  const _recordsByLocation = ref(_data);

  // Interactions
  function addInstance(newInstance: ProcessingInstance) {
    if (_recordsByLocation.value[newInstance.location]) {
      console.error(`Error: ProcessingInstance already exists at ${newInstance.location}`);
      return;
    }

    _recordsByLocation.value[newInstance.location] = {
      instance: newInstance,
      status: StatusCode.Ok,
    };
    startProcessing(newInstance.location);
  }

  async function removeInstanceByLocation(loc: ProcessingLocation) {
    await endProcessing(loc);
    delete _recordsByLocation.value[loc];
  }

  function restartRecoveredInstances() {
    Object.entries(_recoveredData.value).forEach(([location, data]) => {
      // If the recovered data includes valid locations
      if (Object.values<string>(ProcessingLocation).includes(location)) {
        const newInstance = generateProcessingInstance(data.instance as ProcessingInstance);
        addInstance(newInstance);
      } else {
        console.warn("Found localStorageData that didn't match the expected data structure");
      }
    });
  }

  function getInstance(location: ProcessingLocation) {
    const record = _recordsByLocation.value[location];
    return record?.instance;
  }

  function getStatus(location: ProcessingLocation) {
    const record = _recordsByLocation.value[location];
    if (record === undefined) {
      console.error(`Error: location ${location} does not have a record`);
      return;
    }
    return record.status;
  }

  function setStatus(location: ProcessingLocation, newStatus: StatusCode) {
    const record = _recordsByLocation.value[location];
    if (record === undefined) {
      console.error(`Error: location ${location} does not have a record`);
      return;
    }
    record.status = newStatus;
  }

  return {
    _recordsByLocation,
    addInstance,
    removeInstanceByLocation,
    restartRecoveredInstances,
    getInstance,
    getStatus,
    setStatus,
  };
});
