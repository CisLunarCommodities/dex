#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod CCE {
    use super::*;

    pub fn initialize_market(ctx: Context<InitializeMarket>, commodity: String, initial_price: u64) -> Result<()> {
        let market = &mut ctx.accounts.market;
        market.commodity = commodity;
        market.current_price = initial_price;
        market.volume = 0;
        market.authority = ctx.accounts.authority.key();
        Ok(())
    }

    pub fn place_buy_order(ctx: Context<PlaceOrder>, quantity: u64, price: u64) -> Result<()> {
        let order = &mut ctx.accounts.order;
        let market = &mut ctx.accounts.market;

        order.owner = ctx.accounts.owner.key();
        order.quantity = quantity;
        order.price = price;
        order.is_buy = true;
        order.timestamp = Clock::get()?.unix_timestamp;
        
        market.volume = market.volume.checked_add(quantity).unwrap();
        market.current_price = price;

        Ok(())
    }

    pub fn place_sell_order(ctx: Context<PlaceOrder>, quantity: u64, price: u64) -> Result<()> {
        let order = &mut ctx.accounts.order;
        let market = &mut ctx.accounts.market;

        order.owner = ctx.accounts.owner.key();
        order.quantity = quantity;
        order.price = price;
        order.is_buy = false;
        order.timestamp = Clock::get()?.unix_timestamp;
        
        market.volume = market.volume.checked_add(quantity).unwrap();
        market.current_price = price;

        Ok(())
    }

    pub fn close_market(ctx: Context<CloseMarket>) -> Result<()> {
        // Verify authority
        require!(
            ctx.accounts.market.authority == ctx.accounts.authority.key(),
            CCEError::UnauthorizedAccess
        );
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeMarket<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = Market::SPACE
    )]
    pub market: Account<'info, Market>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlaceOrder<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(mut)]
    pub market: Account<'info, Market>,

    #[account(
        init,
        payer = owner,
        space = Order::SPACE
    )]
    pub order: Account<'info, Order>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CloseMarket<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        close = authority,
    )]
    pub market: Account<'info, Market>,
}

#[account]
#[derive(InitSpace)]
pub struct Market {
    pub commodity: String,
    pub current_price: u64,
    pub volume: u64,
    pub authority: Pubkey,
}

#[account]
#[derive(InitSpace)]
pub struct Order {
    pub owner: Pubkey,
    pub quantity: u64,
    pub price: u64,
    pub is_buy: bool,
    pub timestamp: i64,
}

#[error_code]
pub enum CCEError {
    #[msg("You are not authorized to perform this action")]
    UnauthorizedAccess,
}
