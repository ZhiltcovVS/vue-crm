<script>
export default {
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Тип</th>  <!-- TODO: вместо badge здесь можно было бы сделать иконку - цветная стрелочка вниз или вверх -->
      <th>Категория</th>
      <th>Сумма</th>
      <th>Изменено</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="record in records"
      :key="record.id"
    >
      <td>{{ record.rowNumber }}</td>
      <td>
        <span
          class="white-text badge"
          :class="record.typeClass"
        >{{ record.typeText }}</span>
      </td>
      <td>{{ record.categoryName }}</td>
      <td>{{ record.amount }}</td>
      <td>{{ record.date }}</td>
      <td>
        <button
          v-tooltip="'Перейти к деталям'"
          class="btn-small btn"
          @click="$router.push(`/detail/${record.id}`)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
