<script>
import filters from '@/utils/filters';

export default {
  props: {
    rates: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    currencyCodes: {
      type: Array,
      required: true,
      default: () => ([]),
    },
  },
  setup() {
    const headers = ['Валюта', 'Курс', 'Дата'];
    return { headers, filters };
  },
};
</script>

<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th v-for="(header,index) in headers" :key="index">
                {{ header }}
              </th>
            </tr>
          </thead>

          <tbody>
          <tr v-for="code in currencyCodes" :key="code">
            <td>{{ code }}</td>
            <td>{{ rates[code] }}</td>
            <td>{{ filters.dateFormatter(date) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
