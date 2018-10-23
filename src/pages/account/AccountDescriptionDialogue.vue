<template>
  <div class="col-md-12">
    <div class="panel panel-primary">
      <div class="panel-heading">
        Account Settings
      </div>
      <div class="panel-footer">
        <div class="row">
          <div class="col-md-12">
            <label for="wage-name">Account Description:</label>
            <div class="input-group">
              <span class="input-group-addon">Description:</span>
              <input v-model="newDescription" type="text" class="form-control">
            </div>
            <br>
            <div class="input-group">
              <label for="sel1">Public Leaderboards:</label>
              <select v-model="newPublic" class="form-control" id="sel1">
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <br>
            <button type="button" v-on:click="updateDescription" class="btn btn-primary">Save Settings</button>
          </div>
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
    name: 'TransactionDescriptionDialogue',
    store: ['user', 'jwt'],
    props: ['description', 'public'],
    data: function () {
      return {
        newDescription: this.description,
        newPublic: this.public
      }
    },
    methods: {
      updateDescription: function () {
        swal({
          title: 'ARE YOU SURE?',
          type: 'warning',
          text: 'Clicking \'ok\' will change the description',
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            api.request({
              url: '/api/account/id/' + this.$route.params.id,
              headers: {jwt: this.$store.jwt},
              data: {changes: {description: this.newDescription, public: this.newPublic}},
              method: 'put'
            }).then((response) => {
              this.$emit('updatedAccountDescription')
            }).catch(errorHandler)
          }
        })
      }
    }
  }
</script>
