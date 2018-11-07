<template>
  <div class="PageHome">
    <div class="jumbotron">
      <h1>NubBank</h1>
      <p>NubBank is the model world's largest banking and financial services organisations. We serve the Model World through a core system of Retail Banking and Wealth Management. Our network covers /r/MHOC and is about to expand to /r/ModelUSGov.
        <br> <br>
        With a new account management system we aim to be where the growth is, connecting customers to opportunities, enabling businesses to thrive and economies to prosper, and ultimately helping people to fulfil their hopes and realise their ambitions.</p>
      <p>
        <router-link to="/help" class="btn btn-primary btn-lg" role="button">Learn more</router-link>
      </p>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="panel panel-primary">
          <div class="panel-heading">Retail and Commercial Banking</div>
          <div class="panel-body">
            The heart of NubBank is our revolutionary retail and commercial banking system, you can manage your account online and make payments, receiving wages for the roles you perform in the Model World.
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel panel-info">
          <div class="panel-heading">Property Investments</div>
          <div class="panel-body">
            Utilize our state of the art market research tool to invest some of your wealth into property all around the UK, become the brownfield land baron who refuses to demolish or renovate old mills or create a property empire for the ultra wealthy internationalists.<br><br> <strong> Soon &trade; </strong>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel panel-success">
          <div class="panel-heading">Betting and Sweepstakes</div>
          <div class="panel-body">
            Gamble away your earnings on frivolous political and other bets. Watch out for the gambling tax however and make sure you keep your eye on the stakes! Insider trading is forbidden. <br><br> <strong> Soon &trade; </strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHome'
}
</script>
