import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, } from "@nextui-org/navbar";
import { Avatar, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Divider } from "@nextui-org/react";
import React from 'react'
import { Link } from "react-router-dom";



const NavigationBar = () => {
    return (
        <>
            <Navbar maxWidth="xl" height={'53px'} isBordered className="bg-[#f5f5f5]">
                <NavbarBrand>

                    <p className="font-bold text-inherit">Potrait</p>
                </NavbarBrand>


                <NavbarContent as="div" justify="end">
                    <NavbarItem>
                        <Link color="secondary" href="#">
                            Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="#" color="secondary">
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="secondary" href="#">
                            Integrations
                        </Link>
                    </NavbarItem>
                    <Divider orientation="vertical" />
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </>
    )
}

export default NavigationBar