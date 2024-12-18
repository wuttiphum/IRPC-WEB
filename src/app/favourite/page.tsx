'use client'

import { useEffect, useState } from "react";
import SoundCard from "../components/SoundCard";
import { getArrayFromLocalStorage } from "../ultilities/localStorageManager";
import Card from "../components/Card";
import Favourite from "../components/Favourite";

export default function Page() {



    return <Favourite className="flex flex-wrap lg:justify-start md:justify-start justify-center"/>
}