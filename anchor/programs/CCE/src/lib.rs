#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod CCE {
    use super::*;

  pub fn close(_ctx: Context<CloseCCE>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.CCE.count = ctx.accounts.CCE.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.CCE.count = ctx.accounts.CCE.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeCCE>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.CCE.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCCE<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + CCE::INIT_SPACE,
  payer = payer
  )]
  pub CCE: Account<'info, CCE>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCCE<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub CCE: Account<'info, CCE>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub CCE: Account<'info, CCE>,
}

#[account]
#[derive(InitSpace)]
pub struct CCE {
  count: u8,
}
