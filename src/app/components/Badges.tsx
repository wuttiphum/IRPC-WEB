import Badge from "./Badge";

export default function Badges({name}:{name: "air" | 'sound' | 'other'} ) {
    return <div className="badges flex gap-2 flex-wrap">
        {name =='air' &&
            <>
                <Badge text="ดีมาก" status='very'></Badge>
                <Badge text="ดี" status='good'></Badge>
                <Badge text="ปานกลาง" status='medium'></Badge>
                <Badge text="เริ่มมีผลกระทบ" status='effect'></Badge>
                <Badge text="มีผลกระทบ" status='effected'></Badge>
            </>
        }
        {name == 'sound' &&
            <>
                <Badge text="ปกติ" status='good'></Badge>
                <Badge text="เฝ้าระวัง" status='medium'></Badge>
                <Badge text="มีผลกระทบ" status='effected'></Badge>
            </>
        }
        {name == 'other'  &&
            <>
                <Badge text="ปกติ" status='good'></Badge>
                <Badge text="มีผลกระทบ" status='effected'></Badge>
            </>
        }
    </div>
}