// 定时器，配合async await变相实现类似php的sleep效果
function sleep( time ) {
	return new Promise( ( resolve ) => setTimeout( resolve, time ) );
}
export default sleep;
