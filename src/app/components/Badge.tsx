import React from 'react';

interface BadgeProps {
    text?: string;
    className?: string;
    status?: string; // You can further specify this type if needed
    name?: string;
}

const type: any = {
    "very": "bg-[--very-good] text-[--primary] border-[--primary]",
    "good": "bg-[--good] text-[--success] border-[--success]",
    "medium": "bg-[--medium] text-[--yellow] border-[--yellow]",
    "effect": "bg-[--effect] text-[--orange] border-[--orange]",
    "effected": "bg-[--effected] text-[--error-50] border-[--error-50]",
}

const typeIndex: any =
    [
        "bg-[--very-good] text-[--primary] border-[--primary]",
        "bg-[--good] text-[--success] border-[--success]",
        "bg-[--medium] text-[--yellow] border-[--yellow]",
        "bg-[--effect] text-[--orange] border-[--orange]",
        "bg-[--effected] text-[--error-50] border-[--error-50]"
    ]
const typeSoundIndex: any =
    [
        "bg-[--good] text-[--success] border-[--success]",
        "bg-[--medium] text-[--yellow] border-[--yellow]",
        "bg-[--effected] text-[--error-50] border-[--error-50]"
    ]
const typeOtherIndex: any =
    [
        "bg-[--good] text-[--success] border-[--success]",
        "bg-[--effected] text-[--error-50] border-[--error-50]"
    ]

const textStatus = [
    "ดีมาก",
    "ดี",
    "กลาง",
    "เริ่มมีผลกระทบ",
    "มีผลกระทบ",
]
const textSoundStatus = [
    "ปกติ",
    "เฝ้าระวัง",
    "มีผลกระทบ",
]
const textOtherStatus = [
    "ปกติ",
    "มีผลกระทบ",
]

const Badge: React.FC<BadgeProps> = ({ text = '', className = '', status, name = 'air' }) => {
    if (name == 'air')
    {
        return (
            <div
                className={`rounded-full  px-5 h-7 py-2 text-[12px] border border-1 flex items-center justify-center ${status && parseInt(status) ? typeIndex[parseInt(status) - 1] : type[status!]} ${className} `}
            >
                {text || status && parseInt(status) && textStatus[parseInt(status) - 1]  || "ไม่มีข้อมูล"}
    
            </div>
        );
    }
    else if (name == 'sound'){
        return (
            <div
                className={`rounded-full  px-5 h-7 py-2 text-[12px] border border-1 flex items-center justify-center ${status && parseInt(status) ? typeSoundIndex[parseInt(status) - 1] : type[status!]} ${className} `}
            >
                {text || status && parseInt(status) && textSoundStatus[parseInt(status) - 1] || "ไม่มีข้อมูล"}
    
            </div>
        );
    }
    else 
        return (
            
            <div
                className={`rounded-full  px-5 h-7 py-2 text-[12px] border border-1 flex items-center justify-center ${status && parseInt(status) ? typeOtherIndex[parseInt(status) - 1] : type[status!]} ${className} `}
            >
                {text || status && parseInt(status) && textOtherStatus[parseInt(status) - 1] || "ไม่มีข้อมูล"}
    
            </div>
        );
};

export default Badge;


