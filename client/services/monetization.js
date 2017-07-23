import channel from './channel/channel.js';

export function get_plan(plan_id){

	return new Promise((resolve, reject)=>{

		channel

			.req( 'get_plan' , 'monetization' , { plan_id } )

			.then( data => {

				resolve( data.response_map )

			} )
		
	})

}

export function getTransactionsLog(){
	return new Promise((resolve,reject)=>{
		channel
			.req( 'log' , 'coins' , {} )

			.then( data => {

				resolve( data.response_map )

			} )
	});
}

export function plans_list (currency){

	return new Promise((resolve, reject)=>{

		channel

			.req( 'plans_list' , 'monetization' , { currency } )

			.then( data => {

				resolve( data.response_map )

			} )
		
	})

}

export function coins_offers (currency, offer_id){

	return new Promise((resolve, reject)=>{

		channel

			.req( 'coins_offers' , 'monetization' , { currency, offer_id } )

			.then( data => {

				resolve( data.response_map )

			} )
		
	})

}

export function buy_coins ( offer_id, gateway, redirect ){

	return new Promise((resolve, reject)=>{

		channel

			.req( 'buy_coins' , 'monetization' , { offer_id, gateway, redirect } )

			.then( data => {

				resolve( data.response_map )

			} )
		
	})

}

export function subscribe ( plan_id, shop_id ){

	return new Promise((resolve, reject)=>{

		channel

			.req( 'subscribe' , 'monetization' , { plan_id, shop_id  } )

			.then( data => {

				resolve( data.response_map )

			} )
		
	})

}

export function setSelectedPlan(plan_id){
	localStorage.setItem("directbot_monetization_plan",plan_id)
}

export function setSelectedCoinOffer(offer_id){
	localStorage.setItem("directbot_monetization_coinoffer",offer_id)
}