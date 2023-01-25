export default function reformatDate(date) {
	return new Date(Date.parse(date)).toLocaleDateString('uk-UA');
}
