import kaboom from "kaboom"

kaboom()

add([
    text("hello world"),
    pos(120, 80),
] )

loadSprite( "bean",'sprites/bean.png' )

	add([
		sprite("bean"),
		pos(120, 100),
	])