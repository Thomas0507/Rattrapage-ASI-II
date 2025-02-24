import React from "react"
import ProfileComponent from "../../components/ProfileComponent"
import { Player } from "../../models/Player"
import { Card } from "../../models/Card";

function ProfilePage () {

    const player = new Player(1, "username", [
        new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral")
        ],
        45);

    return (
    <div>
        <ProfileComponent player={player}/>
    </div>)
}

export default ProfilePage