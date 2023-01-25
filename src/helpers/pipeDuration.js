export default function timeConvert(mins, long = false) {
	let hours = mins / 60;
	let rhours = Math.floor(hours);
	if (long) {
		rhours = rhours < 10 ? `0${rhours}` : rhours;
	}

	let minutes = (hours - rhours) * 60;
	let rminutes = Math.round(minutes);
	rminutes = rminutes < 10 ? `0${rminutes}` : rminutes;

	return `${rhours}:${rminutes}`;
}
