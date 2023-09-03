
function Menu_nav (props) {
    // create tags for menu items
    const menu_item_tags = []
    for(let i=0 ; i <props.modes.length; i++){
        let t = props.modes[i];
        menu_item_tags.push(<li key={t.id}>
                <a id={t.id} href={t.loc} onClick={event=>{
                    event.preventDefault();
                    props.onChangeMode(Number(event.target.id));
                }}>
                    {t.title}
                </a>
            </li>)
    }

    // return
    return (
        <nav>
            <ul>
            {menu_item_tags}
            </ul>
        </nav>
    );
}

export default Menu_nav;