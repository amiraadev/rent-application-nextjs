/** @format */

import React from "react";
import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
	{
		label: "Beach",
		icon: TbBeach,
		description: "This property is close to the beach",
	},
	{
		label: "Windmills",
		icon: GiWindmill,
		description: "This property has windmills",
	},
	{
		label: "Modern",
		icon: MdOutlineVilla,
		description: "This property is modern ",
	},
	{
		label: "Countryside",
		icon: TbMountain,
		description: "This property is the countryside ",
	},
	{
		label: "Pools",
		icon: TbPool,
		description: "This property has a pool ",
	},
	{
		label: "Islands",
		icon: GiIsland,
		description: "This property is on an Island ",
	},
	{
		label: "Lake",
		icon: GiBoatFishing,
		description: "This property is close to a lake ",
	},
	{
		label: "Skiing",
		icon: FaSkiing,
		description: "This property has skiing activities ",
	},
	{
		label: "Castles",
		icon: GiCastle,
		description: "This property in a castle ",
	},
	{
		label: "Camping",
		icon: GiForestCamp,
		description: "This property has camping activities ",
	},
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment!'
      },
      {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
      },
      {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!'
      },
      {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!'
      }
];
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname()

    const isMAinPage = pathname === '/'

    if(!isMAinPage){
        return null
    }
	return (
		<Container>
			<div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {
                    categories.map((item) =>(
                        <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                        />
                    ))
                }
            </div>
		</Container>
	);
};

export default Categories;
