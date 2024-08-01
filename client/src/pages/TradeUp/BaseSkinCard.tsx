import React, { ReactNode } from "react";
import { Card } from "react-bootstrap";
import { SkinData } from "../../types/types";

type BaseSkinCardProps = {
    skinDisplay: SkinData;
    headerContent?: ReactNode;
    bodyContent?: ReactNode;
    onSkinClick?: (skin: SkinData) => void;
};

const BaseSkinCard = ({ skinDisplay, headerContent, bodyContent, onSkinClick }: BaseSkinCardProps): JSX.Element => {
    return (
        <Card className={`skin-card user-select-none h-100 py-2 square-card ${skinDisplay.quality.split(" ").join("-").toLowerCase()}`}
            onClick={onSkinClick && (() => onSkinClick(skinDisplay))}>
            <Card.Header className="py-1">
                {skinDisplay.name}
                {headerContent}
            </Card.Header>
            <Card.Img src={skinDisplay.img} alt="Skin Image" draggable="false" />
            <Card.Body className="py-0">
                <Card.Text className="text-center">
                    {skinDisplay.priceInput.toFixed(2)}
                </Card.Text>
                {bodyContent}
            </Card.Body>
        </Card>
    );
};

export default BaseSkinCard;