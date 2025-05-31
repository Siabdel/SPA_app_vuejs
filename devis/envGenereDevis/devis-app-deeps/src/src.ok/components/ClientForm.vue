<template>
  <div class="space-y-4">
    <div>
      <label for="client-name" class="block text-sm font-medium text-gray-700">Nom</label>
      <input
        id="client-name"
        type="text"
        :value="localClient.name"
        @input="updateLocalClient('name', $event.target.value)"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>

    <div>
      <label for="client-email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="client-email"
        type="email"
        :value="localClient.email"
        @input="updateLocalClient('email', $event.target.value)"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>

    <div>
      <label for="client-address" class="block text-sm font-medium text-gray-700">Adresse</label>
      <input
        id="client-address"
        type="text"
        :value="localClient.address"
        @input="updateLocalClient('address', $event.target.value)"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="client-city" class="block text-sm font-medium text-gray-700">Ville</label>
        <input
          id="client-city"
          type="text"
          :value="localClient.city"
          @input="updateLocalClient('city', $event.target.value)"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <label for="client-postalCode" class="block text-sm font-medium text-gray-700">Code postal</label>
        <input
          id="client-postalCode"
          type="text"
          :value="localClient.postalCode"
          @input="updateLocalClient('postalCode', $event.target.value)"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
    </div>

    <div>
      <label for="client-phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
      <input
        id="client-phone"
        type="tel"
        :value="localClient.phone"
        @input="updateLocalClient('phone', $event.target.value)"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localClient: { ...this.modelValue } // Copie locale
    };
  },
  watch: {
    modelValue(newVal) {
      // Mettre à jour la copie locale si le parent modifie la valeur
      this.localClient = { ...newVal };
    }
  },
  methods: {
    updateLocalClient(field, value) {
      this.localClient = {
        ...this.localClient,
        [field]: value
      };

      // Émettre au parent
      this.$emit('update:modelValue', { ...this.localClient });
    }
  }
};
</script>
