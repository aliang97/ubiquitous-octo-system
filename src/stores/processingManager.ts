import type { ProcessingInstance } from '@/types';
import { PROCESSING_LOCALSTORAGE_KEY } from '@/utils';
import { ProcessingLocation } from '@/utils/enums';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { startProcessing, endProcessing } from '@/utils/processing';

type ProcessingRecord = Partial<Record<ProcessingLocation, ProcessingInstance>>;
export const useProcessingManagerStore = defineStore('processingManager', () => {
  const processing: ProcessingRecord = {};
  let recovered: ProcessingRecord = {};
  const localStorageData = localStorage.getItem(PROCESSING_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    if (recoveredState.instancesByLocation) {
      recovered = recoveredState.instancesByLocation;
    }
  }

  const instancesByLocation = ref(processing);
  const recoveredInstancesByLocation = ref(recovered);

  async function addInstance(newInstance: ProcessingInstance) {
    if (instancesByLocation.value[newInstance.location]) {
      console.error(
        `Error while adding new Processing Instance: Processing already in progress at location ${newInstance.location}}`,
      );
      return;
    }

    instancesByLocation.value[newInstance.location] = newInstance;
    startProcessing(newInstance.location);
  }

  async function removeInstanceByLocation(loc: ProcessingLocation) {
    await endProcessing(loc);
    delete instancesByLocation.value[loc];
  }

  function restartRecoveredInstances() {
    Object.entries(recoveredInstancesByLocation.value).forEach(
      ([location, instance]: [string, ProcessingInstance]) => {
        console.log(`restarting Processing Instance at ${location}`);
        const restartedInstance = instance;
        addInstance(restartedInstance);
        delete recoveredInstancesByLocation.value[location as ProcessingLocation];
      },
    );
  }

  return {
    instancesByLocation,
    recoveredInstancesByLocation,
    addInstance,
    removeInstanceByLocation,
    restartRecoveredInstances,
  };
});
