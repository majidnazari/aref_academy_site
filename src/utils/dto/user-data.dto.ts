export interface SubMenu {
    id: string;
    slug: string;
    name: string;
    icon: string;
    href: string;
}

export interface Menu {
    id: string;
    slug: string;
    name: string;
    icon: string;
    href: string;
    parent_id: number;
    subMenus: SubMenu[];
}

export interface Group {
    name: string;
    menus: Menu[];
}

export interface UserData {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    group: Group;
}