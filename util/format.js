import dayjs from "dayjs";
import numeral from "numeral";
import utc from "dayjs/plugin/utc";
import { startCase, toLower } from "lodash";
dayjs.extend(utc);

export const formatIcpAmount = (value) => {
  if (!value) {
    return value
  }
  return `${numeral(parseFloat(parseFloat(value / 100000000).toFixed(5))).format("0,0.0000")}`
}
export const formatIcpPrice = (value) => {
  if (!value) {
    return value
  }
  return `${(value).toFixed(2)}`
}
export const formatPercent = (value) => {
  if (value === 0) {
    return "0%"
  }
  if (!value) {
    return value
  }
  return `${(value).toFixed(2)} %`
}

export const formatNumber = (number) => {
  if (!number) {
    return number
  }
  if (number >= 1e9) {
    return (number / 1e9).toFixed(2) + ' B';
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(2) + ' M';
  } else {
    return number.toString();
  }
}

export const formatNeuronState = (value) => {
  const map = {
    0: "solving",
    1: "Dissolved",
    2: "Dissolving",
  }
  return `${map[value]}`
}

export const formatAddress = (str) => {
  if (!str) {
    return "";
  }
  const maxLength = 12;
  const ellipsis = '...';

  if (str?.length <= maxLength) {
    return str;
  } else {
    const prefix = str.slice(0, 6);
    const suffix = str.slice(-6);
    return prefix + ellipsis + suffix;
  }
}

export const formatVolume = (value) => {
  if (!value) {
    return value;
  }
  return `${value.toLocaleString()}`
}

export const formatUTCTime = (value) => {
  if (!value) {
    return value;
  }
  return `${dayjs(value * 1000).utc().format('YYYY-MM-DD HH:mm:ss')} UTC`
}

export const formatSecondsAge = (seconds, suffixText) => {
  if (!seconds) {
    return seconds;
  }
  const minutes = Math.ceil(seconds / 60);
  const hours = Math.ceil(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = months / 12 === 0 ? 0 : Math.ceil(months / 12);
  const suffix = suffixText ? ` ${suffixText}` : ""

  if (years > 0) {
    return `${years} years${suffix}`;
  } else if (months > 0) {
    return `${months} months${suffix}`;
  } else if (days > 0) {
    return `${days} days${suffix}`;
  } else if (hours > 0) {
    return `${hours} hours${suffix}`;
  } else if (minutes > 0) {
    return `${minutes} minutes${suffix}`;
  } else {
    return `${seconds} seconds${suffix}`;
  }
}
export const formatDaysAge = (seconds, suffixText) => {
  if (!seconds) {
    return seconds;
  }
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const suffix = suffixText ? ` ${suffixText}` : ""

  if (days > 0) {
    return `${days} days${suffix}`;
  } else if (hours > 0) {
    return `${hours} hours${suffix}`;
  } else if (minutes > 0) {
    return `${minutes} minutes${suffix}`;
  } else {
    return `${seconds} seconds${suffix}`;
  }
}

export const getTimeAgo = (timestamp) => {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);
  const timeDifference = currentDate - previousDate;
  const seconds = timeDifference > 0 ? Math.floor(timeDifference / 1000) : 0;
  return formatSecondsAge(seconds, "ago")
};

export const formatTopic = (topic) => {
  if (!topic) {
    return topic;
  }
  return startCase(toLower(topic.replace("TOPIC_", "")))
}
