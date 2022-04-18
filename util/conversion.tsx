export function convertMicroDenomToDenom(amount: number | string) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount / 1000000
  return isNaN(amount) ? 0 : amount
}

export function convertDenomToMicroDenom(amount: number | string): string {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount * 1000000
  return isNaN(amount) ? '0' : String(amount)
}

export function convertFromMicroDenom(denom: string) {
  return denom?.substring(1).toUpperCase()
}

export function convertMicroDenomToDenom2(amount: number | string, decimals: number) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }

  amount = amount / Math.pow(10, decimals)
  return isNaN(amount) ? 0 : amount
}

export function convertDenomToMicroDenom2(amount: number | string, decimals: number): string {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = Math.round(amount * Math.pow(10, decimals))
  return isNaN(amount) ? '0' : String(amount)
}

export function convertToFixedDecimals(amount: number | string): string {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  if (amount > 0.01) {
    return amount.toFixed(2)
  } else return String(amount)
}

export function convertTimeToHMS(time: number | undefined) : any {
  if (!time) return null
  const sec = time % 60
  const minTime = Math.floor(time / 60)
  const min = minTime % 60
  let hour = Math.floor(minTime / 60)
  const day = Math.floor(hour / 24)
  hour = hour % 24
  return {
    day,
    hour,
    min,
    sec
  }
}

export  function ConvertToNoExponents(value) {
  var data = String(value).split(/[eE]/);
  if (data.length == 1) return data[0];

  var z = '',
    sign = this < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
}

export const zeroVotingCoin = {
  amount: '0',
  denom: 'ucredits',
}

export const zeroStakingCoin = {
  amount: '0',
  denom: process.env.NEXT_PUBLIC_STAKING_DENOM || 'ujuno',
}
