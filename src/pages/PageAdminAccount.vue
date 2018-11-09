<template>
  <div id="PageAdminAccounts">
    <div class="page-header">
      <h1>Account Management
        <small>Create and access accounts</small>
      </h1>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            Add Account
          </div>
          <form>
            <div class="panel-body">
              <div class="input-group">
                <span class="input-group-addon">Account Name:</span>
                <input v-model="newAccount.name" type="text" id="wage-name" class="form-control">
              </div>
              <br>
              <div class="input-group">
                <span class="input-group-addon">Account Description:</span>
                <input v-model="newAccount.description" type="text" id="wage-description" class="form-control">
              </div>
              <br>
              <div class="input-group">
                <span class="input-group-addon">Initial Owner (Without /u/ Case Insensitive):</span>
                <input v-model="newAccount.owner" type="text" id="wage-amount" class="form-control">
              </div>
              <br>
              <div class="input-group">
                <label for="sel1">Public Account:</label>
                <select v-model="newAccount.public" class="form-control" id="sel1">
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div class="input-group">
                <label for="sel2">Company Account:</label>
                <select v-model="newAccount.company" class="form-control" id="sel2">
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
            <div class="panel-footer">
              <button v-on:click="submitNew" type="button" class="btn btn-primary">Submit Form</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            Account Search
          </div>
          <vue-good-table
          :columns="allAccounts.columns"
          :rows="allAccounts.rows"
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
              <span v-if="props.column.field === 'name'">{{ props.row.name }}</span>
              <span v-if="props.column.field === 'description'">{{ props.row.description }}</span>
              <span v-if="props.column.field === 'public'">{{ props.row.public }}</span>
              <span v-if="props.column.field === 'company'">{{ props.row.company }}</span>
              <span v-if="props.column.field === 'created'">{{ props.row.created | dateString}}</span>
              <span v-if="props.column.field === 'buttons'"><router-link :to="'/account/' + props.row._id" type="button" class="btn btn-primary">Access Account</router-link></span>
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
  name: 'PageAdminAccounts',
  store: ['user', 'jwt', 'currencies'],
  data: function () {
    return {
      newAccount: {
        name: 'X\'s Personal Account',
        description: 'Premium personal banking',
        owner: 'X',
        public: "true",
        company: "false"
      },
      allAccounts: {
        columns: [
          {
            label: 'ID',
            field: '_id'
          },
          {
            label: 'Name',
            field: 'name'
          },
          {
            label: 'Description',
            field: 'description'
          },
          {
            label: 'Public?',
            field: 'public',
            type: 'boolean'
          },
          {
            label: 'Company?',
            field: 'company',
            type: 'boolean'
          },
          {
            label: 'Created Date',
            field: 'created'
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
    submitNew: function (event) {
      let $this = this
      api.request({
        url: '/api/account',
        method: 'post',
        headers: {jwt: this.$store.jwt},
        data: {newDocument: $this.newAccount}
      }).then(function (response) {
        $this.allAccounts.rows.push(response.data) // Add new account to table onscreen

        swal({
          title: 'Creation Success!',
          type: 'success',
          text: 'Account succesfully created!',
          buttons: {
            stay: {
              text: 'Stay Here',
              value: false
            },
            change: {
              text: 'Visit Account',
              value: true
            }
          }
        }).then((result) => {
          if (result.value) {
            $this.$router.push('/account/' + response.data['_id']) // Redirect to account page
          }
        })
        console.log(response.data)
      }).catch(errorHandler)
    },
    fetchAccounts: function () {
      let $this = this
      api.request({
        url: '/api/account/admin',
        method: 'get',
        headers: {jwt: this.$store.jwt}
      }).then(function (response) {
        $this.allAccounts.rows = response.data
      }).catch(errorHandler)
    }
  },
  mounted: function () {
    this.fetchAccounts()
  },
  filters: {
    dateString: function (dateIn) {
      let date = new Date(dateIn)
      let string = date.toLocaleString('en-GB')
      return string
    }
  }
}
</script>
