import styled from "@emotion/styled"
import * as React from "react"

export const TypographyAdmix = ({
  type,
  children,
  color,
  style,
  otherProps,
}: {
  type:
    | "bodyBold"
    | "small"
    | "boldSmall"
    | "bodyBoldL18"
    | "actioned"
    | "semiBodyBold"
    | "bodySmallL24"
    | "semiBodyBoldL18"
  children: React.ReactNode
  color?: string
  style?: React.CSSProperties
  otherProps?: any
}) => {
  const typographyMap = {
    bodyBold: (
      <BodyBold color={color} style={style} {...otherProps}>
        {children}
      </BodyBold>
    ),
    small: (
      <Small color={color} style={style} {...otherProps}>
        {children}
      </Small>
    ),
    boldSmall: (
      <BoldSmall color={color} style={style} {...otherProps}>
        {children}
      </BoldSmall>
    ),
    bodyBoldL18: (
      <BodyBoldL18 color={color} style={style} {...otherProps}>
        {children}
      </BodyBoldL18>
    ),
    actioned: (
      <Actioned color={color} style={style} {...otherProps}>
        {children}
      </Actioned>
    ),
    semiBodyBold: (
      <SemiBodyBold color={color} style={style} {...otherProps}>
        {children}
      </SemiBodyBold>
    ),
    bodySmallL24: (
      <BodySmallL24 color={color} style={style} {...otherProps}>
        {children}
      </BodySmallL24>
    ),
    semiBodyBoldL18: (
      <SemiBodyBoldL18 color={color} style={style} {...otherProps}>
        {children}
      </SemiBodyBoldL18>
    ),
  }
  return typographyMap[type]
}

const BodyBold = styled.span<{ color?: string }>`
  font-size: 14px;
  line-height: 21px;
  font-weight: 700;
  ${({ color }) => color && `color: ${color}`}
`
const SemiBodyBold = styled.span<{ color?: string }>`
  font-size: 18px;
  line-height: 18px;
  font-weight: 700;
  ${({ color }) => color && `color: ${color}`}
`
const BodyBoldL18 = styled.span<{ color?: string }>`
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
  ${({ color }) => color && `color: ${color}`}
`
const SemiBodyBoldL18 = styled.span<{ color?: string }>`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  ${({ color }) => color && `color: ${color}`}
`
const BodySmallL24 = styled.span<{ color?: string }>`
  font-size: 12px;
  line-height: 24px;
  font-weight: 700;
  ${({ color }) => color && `color: ${color}`}
`

const Small = styled.span<{ color?: string }>`
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  ${({ color }) => color && `color: ${color}`}
`
const BoldSmall = styled.span<{ color?: string }>`
  font-size: 12px;
  line-height: 24px;
  font-weight: 900;
  ${({ color }) => color && `color: ${color}`}
`
const Actioned = styled.span<{ color?: string }>`
  font-size: 12px;
  line-height: 15.06px;
  font-weight: 700;
  ${({ color }) => color && `color: ${color}`}
`
