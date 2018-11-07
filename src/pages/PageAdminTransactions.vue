<template>
  <div id="PageAdminAccounts">
    <div class="page-header">
      <h1>Transaction Management
        <small>Delete and view transactions</small>
      </h1>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            View Transactions
          </div>
          <vue-good-table
            :columns="allTransactions.columns"
            :rows="allTransactions.rows"
            :search-options="{
              enabled: true
            }"
            :pagination-options="{
              enabled: true
            }"
            :sort-options="{
              enabled: true,
              initialSortBy: {field: 'created', type: 'desc'}
            }"
          >
            <template slot="table-row" scope="props">
              <span v-if="props.column.field === '_id'"><strong>{{ props.row._id }}</strong></span>
              <span v-if="props.column.field === 'from'"><router-link :to="'/account/' + props.row.from">{{ props.row.from }}</router-link></span>
              <span v-if="props.column.field === 'to'"><router-link :to="'/account/' + props.row.to">{{ props.row.to }}</router-link></span>
              <span v-if="props.column.field === 'amount'">{{ props.row.amount | currency}}</span>
              <span v-if="props.column.field === 'description'">{{ props.row.description}}</span>
              <span v-if="props.column.field === 'created'">{{ props.row.created | dateString}}</span>
              <span v-if="props.column.field === 'buttons'">
                <button class="btn btn-danger" v-on:click="deleteTransaction(props.row._id)">Delete</button>
              </span>
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
  import swal from 'sweetalert2'

  export default {
    name: 'PageAdminTransactions',
    store: ['user', 'jwt', 'currencies'],
    data: function () {
      return {
        allTransactions: {
          columns: [
            {
              label: 'ID',
              field: '_id'
            },
            {
              label: 'From',
              field: 'from'
            },
            {
              label: 'To',
              field: 'to'
            },
            {
              label: 'Amount',
              field: 'amount',
              type: 'decimal'
            },
            {
              label: 'Description',
              field: 'description',
              sortable: false
            },
            {
              label: 'Created Date',
              field: 'created',
              type: 'decimal'
            },
            {
              label: 'Buttons',
              field: 'buttons',
              sortable: false
            }
          ],
          rows: []
        }
      }
    },
    methods: {
      fetchTransactions: function () {
        api.request({
          url: '/api/transaction',
          method: 'get',
          headers: {jwt: this.$store.jwt}
        }).then((response) => {
          this.processTransactions(response.data)
        }).catch(errorHandler)
      },
      processTransactions: function (transactions) {
        let processedTransactions = []

        transactions.forEach(function (transaction) {
          transaction.created = Date.parse(transaction.created)

          processedTransactions.push(transaction)
        })

        this.allTransactions.rows = processedTransactions
      },
      deleteTransaction: function (transactionID) {
        swal({
          title: 'ARE YOU SURE?',
          type: 'warning',
          text: 'Clicking \'ok\' will permanently delete this transaction!',
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            api.request({
              url: '/api/transaction/id/' + transactionID,
              method: 'delete',
              headers: {jwt: this.$store.jwt}
            }).then((response) => {
              this.processTransactions(response.data)
            }).catch(errorHandler)
          }
        })
      }
    },
    mounted: function () {
      this.fetchTransactions()
    },
    filters: {
      currency: function (value) {
        return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      },
      dateString: function (dateIn) {
        let date = new Date(dateIn)
        let string = date.toLocaleString('en-GB')
        return string
      }
    }
  }
</script>
