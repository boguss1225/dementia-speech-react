import './menu.css';

function Menu_nav (props) {
    // create tags for menu items
    const menu_item_tags = []
    for(let i=0 ; i <props.modes.length; i++){
        let t = props.modes[i];
        menu_item_tags.push(
            <a key={t.id} class={t.active} id={t.id} href={t.loc} onClick={event=>{
                event.preventDefault();
                props.onChangeMode(Number(event.target.id));
            }}><i class={t.class}></i>
                    {/* {t.title} */}
            </a>
        )
    }

    // return
    return (
        <div class="icon-bar">            
            {menu_item_tags}
        </div>
    );
}

export default Menu_nav;