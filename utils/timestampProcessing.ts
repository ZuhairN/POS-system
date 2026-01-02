export default function readableTimeConverter(oldUnix) {
  const nowUnix = Date.now();

  const toMs = v => (v > 1e12 ? Math.floor(v) : Math.floor(v) * 1000);

  const oldMs = toMs(oldUnix);
  const nowMs = toMs(nowUnix);

  let deltaSec = Math.floor((nowMs - oldMs) / 1000);

  const inFuture = deltaSec < 0;
  if (inFuture) deltaSec = Math.abs(deltaSec);

  if (deltaSec < 60) {
    const v = deltaSec;
    const unit = 'sec';
    const str = `${v} ${unit}${v === 1 ? '' : 's'} ago`;
    return str;
  }

  if (deltaSec < 3600) {
    const v = Math.floor(deltaSec / 60);
    const unit = 'min';
    const str = `${v} ${unit}${v === 1 ? '' : 's'} ago`;
    return str;
  }

  const v = Math.floor(deltaSec / 3600);
  const unit = 'hour';
  const str = `${v} ${unit}${v === 1 ? '' : 's'} ago`;
  return str;
}
