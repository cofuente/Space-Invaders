/* eslint-disable camelcase */
import kaboom from 'kaboom'

kaboom({
    scale: 1.5
})

loadRoot('sprites/' )
loadSprite('space', 'space.jpg')
loadSprite('rocket1', 'rocket1.png')
loadSprite('rocket2', 'rocket2.png')
loadSprite('rocket3', 'rocket3.png')
loadSprite('rocket4', 'rocket4.png')
loadSprite('ship', 'ship.png')
loadSprite('bullet', 'bullet.png')
loadSprite('asteroid', 'asteroid.png')
loadSprite('asteroid_small1', 'asteroid_small1.png')
loadSprite('asteroid_small2', 'asteroid_small2.png')
loadSprite('asteroid_small3', 'asteroid_small3.png')
loadSprite('asteroid_small4', 'asteroid_small4.png')

loadRoot('sounds/')
loadSound('rocket_thrust', 'rocket_thrust.wav')
loadSound('laser', 'laser.wav')
loadSound('explosion', 'explosion.mp3')
loadSound( 'Steamtech-Mayhem_Looping', 'Steamtech-Mayhem_Looping.mp3' )

// first (and for now only) scene
scene('main', () => {
  layers([
    'bg',
    'obj',
    'ui',
  ], 'obj') // set obj layer to be the default layer

  add([// background
    sprite( 'space' ),
    layer('bg')
  ])

  let score = 0

  // ui
  ui = add( [
    layer('ui')
  ])
  ui.on('draw', () => { // called on every frame of the game
    drawText({
        text: 'Score: ' + score,
        size: 14,
        font: 'sink',
        pos: vec2(8, 24)
    })
  })

  const player = add([
    sprite('ship'),
    pos(160, 120), // TODO: set to center of screen
    rotate(0),
    origin('center'), // sets the sprite's origin to "center", so that when we rotate the ship, it will rotate around the middle of its sprite rather than the default top-left corner
    solid(),
    area(), // collision area for the sprite
    'player',
    'mobile',
    'wraps',
    {
      turn_speed: 4.58,
      speed: 0,
      max_thrust: 48,
      acceleration: 2,
      deceleration: 4,
      lives: 3,
      can_shoot: true,
      laser_cooldown: 0.5,
      invulnerable: false,
      invulnerablity_time: 3,
      animation_frame: 0,
      thrusting: false
    }
  ])

})

// initialize scene 'main'
go( 'main' )
