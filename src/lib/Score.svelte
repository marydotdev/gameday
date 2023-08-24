<script>
  export let game
  

</script>

<div class="w-full py-2 flex flex-col justify-center gap-4">
            <div class="flex justify-start gap-2">
              <img
                src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.teams.away.team.id}.svg`}
                alt="team logo"
                class="w-6 h-6 lg:w-8 lg:h-8"
              />
              <!-- <div class="w-full flex justify-between">
                <div>{game.teams.away.team.name}</div>
                {#if game.status.abstractGameCode === 'P'}
                <div></div>
                {:else}
                <div>
                  {#if !game.teams.away.score}
                  <div>0</div>
                  {:else}
                  <div>{game.teams.away.score}</div>
                  {/if}
                </div>
                {/if}
              </div> -->
					  </div>
            <div class="flex justify-start gap-2">
              <img
                src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.teams.home.team.id}.svg`}
                alt="team logo"
                class="w-6 h-6 lg:w-8 lg:h-8"
              />
              <!-- <div class="w-full flex justify-between">
                <div>{game.teams.home.team.name}</div>
                {#if game.status.abstractGameCode === 'P'}
                <div></div>
                {:else}
                <div>
                  {#if !game.teams.home.score}
                  <div>0</div>
                  {:else}
                  <div>{game.teams.home.score}</div>
                  {/if}
                </div>
                {/if}
              </div> -->
            </div>
          </div>
