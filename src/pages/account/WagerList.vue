<template>
  <div class="col-md-12">
    <div class="panel panel-primary">
      <div class="panel-heading">
        My Wagers
      </div>
      <vue-good-table
        :columns="betTable"
        :rows="bets"
        :search-options="{
            enabled: true
          }"
        :pagination-options="{
            enabled: true,
            initialSortBy: {field: 'created', type: 'desc'}
          }">
      </vue-good-table>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import errorHandler from '@/errorHandler'
  // import swal from 'sweetalert2'

  export default {
    name: 'WagerList',
    store: ['user', 'jwt'],
    data: function () {
      return {
        bets: [],
        betTable: [
          {
            label: 'Created',
            field: 'created'
          },
          {
            label: 'Bet ID',
            field: '_id'
          },
          {
            label: 'Amount',
            field: 'amount'
          },
          {
            label: 'Bet',
            field: 'bet.name'
          },
          {
            label: 'Option',
            field: 'chosenOption.name'
          }
        ]

      }
    },
    methods: {
      fetchBets: function () {
        api.request({
          url: '/api/wager/account/' + this.$route.params.id,
          method: 'get',
          headers: {jwt: this.$store.jwt}
        }).then((response) => {
          response.data.forEach((wager) => {
            wager.chosenOption = null

            wager.bet.options.forEach((option) => {
              if (option._id === wager.betOption) {
                wager.chosenOption = option
              }
            })
          })
          this.bets = response.data
        }).catch(errorHandler)
      }
    },
    mounted: function () {
      this.fetchBets()
    }
  }
</script>
