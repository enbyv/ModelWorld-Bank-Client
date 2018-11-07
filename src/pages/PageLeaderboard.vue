<template>
  <div id="PageAdminAccounts">
    <div class="page-header">
      <h1>Leaderboard
        <small>Who is the richest fuck of them all?</small>
      </h1>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            Balance Leaderboard
          </div>
          <vue-good-table
          :columns="allAccounts.columns"
          :rows="allAccounts.rows"
          :line-numbers="true"
          :search-options="{
            enabled: true
          }"
          :pagination-options="{
            enabled: true
          }"
          :sort-options="{
            enabled: true,
            initialSortBy: {field: 'balance', type: 'desc'}
          }">
            <template slot="table-row" scope="props">
              <span :title="props.row.name" v-if="props.column.field === 'name'"><strong>{{ props.row.name }}</strong></span>
              <span v-if="props.column.field === 'balance'">{{ props.row.balance }}</span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import errorHandler from '@/errorHandler'

export default {
  name: 'PageLeaderboard',
  store: ['user', 'jwt'],
  data: function () {
    return {
      allAccounts: {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sortable: false
          },
          {
            label: 'Balance',
            field: 'balance',
            type: 'decimal',
            formatFn: this.formatBalance
          },
        ],
        rows: []
      },
      lastUpdated: null
    }
  },
  methods: {
    fetchAccounts: function () {
      api.request({
        url: '/api/account/public',
        method: 'get',
        headers: {jwt: this.$store.jwt}
      }).then((response) => {
        this.allAccounts.rows = response.data.leaderboard
        console.log(response.data.lastUpdated)
      }).catch(errorHandler)
    }
  },
  mounted: function () {
    this.fetchAccounts()
  },
  formatBalance: function(value) {
    return Math.round((value + 0.00001) * 100) / 100;
    // apparently this doesn't work. would like to format with a £ but that doesn't work either
    // guess i'll die lol
  }
}
</script>
