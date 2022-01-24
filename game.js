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

loadRoot('sounds/')
loadSound('rocket_thrust', 'rocket_thrust.wav')
loadSound('laser', 'laser.wav')
loadSound('explosion', 'explosion.mp3')
loadSound( 'Steamtech-Mayhem_Looping', 'Steamtech-Mayhem_Looping.mp3' )

// first (and for now only) scene
scene( 'main',() => {
  // helper functions
  function pointAt(distance, angle) { // calculates a point at a distance and angle from the origin
    let radians = -1*deg2rad(angle)
    return vec2(distance * Math.cos(radians), -distance * Math.sin(radians))
  }

  function asteroidSpawnPoint() {
     // spawn randomly at the edge of the scene
     return choose([rand(vec2(0), vec2(width(), 0)),
             rand(vec2(0), vec2(0, height())),
             rand(vec2(0, height()), vec2(width(), height())),
             rand(vec2(width(), 0), vec2(width(), height()))])
  }
  // LAYERS FOR THE SCENE
  layers([
    'bg',
    'obj',
    'ui',
  ], 'obj') // set obj layer to be the default layer
  
  // background
  add( [
    sprite( 'space' ),
    layer('bg')
  ])

  let score = 0
  // ui
  ui = add( [
    layer('ui')
  ] )

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
    pos(350, 275), // TODO: dynamically set to center of canvas
    rotate(0),
    // sets the sprite's origin to "center"
    origin( 'center' ),
    solid(),
    // initializes collision area for the sprite
    area(),
    // tags
    'player',
    'mobile',
    'wraps',
    {
      turn_speed: 4.58,
      speed: 0,
      max_thrust: 48,
      acceleration: 2,
      deceleration: 4,
      can_shoot: true,
      laser_cooldown: 0.5,
      animation_frame: 0,
      thrusting: false
    }
  ])

  // player movement
  onKeyDown('left', () => player.angle -= player.turn_speed)
  onKeyDown('right', () => player.angle += player.turn_speed)
  
  onKeyDown('up', () => {
    player.speed = Math.min(player.speed+player.acceleration, player.max_thrust) // eases the player's speed up
    play('rocket_thrust', {
      volume: 0.1,
      speed: 3.0,
    })
  })
  onKeyDown('down', () => {
    player.speed = Math.max(player.speed-player.deceleration, -player.max_thrust)
    play('rocket_thrust', {
        volume: 0.2,
        speed: 2.0,
    })
  } )
  // Movement
  onUpdate('mobile', (e) => {
    e.move(pointAt(e.speed, e.angle))
  } )
  
  // Wrap around the screen
  onUpdate( 'wraps',( e ) => {
    const {x, y} = e.pos
      if (x > width()) e.pos.x = 0
      if (x < 0) e.pos.x = width()
      if (y > height()) e.pos.y = 0
      if (y < 0) e.pos.y = height()
  } )
  
  // -------Animate rocket
  const thrust_animation = [ 'rocket1','rocket2','rocket3','rocket4' ]
  onKeyPress('up', () => {
    player.thrusting = true
    player.animation_frame = 0 // index of thrust animation
  })
  onKeyRelease('up', () => {
    player.thrusting = false
  } )
  onDraw('player', (p) => {
  if (player.thrusting) {
    // draw current frame
    drawSprite( {
      sprite: thrust_animation[p.animation_frame],
      pos: p.pos.add(pointAt(-p.height/2 , p.angle)),
      origin: 'center',
      angle: p.angle
    })
  }
  let move_delay = 0.1
  let timer = 0
  // loop thru rocket sprites 
    onUpdate(() => {
      timer += dt()
      if (timer < move_delay) return
      timer = 0
      if (player.thrusting) {
        player.animation_frame++
        if (player.animation_frame >= thrust_animation.length) { // wrap to start
          player.animation_frame = 0
        }
      }
    })
  } )
// -------Animate rocket
  
// Asteroids
const NUM_ASTERIODS = 5
for (let i = 0; i < NUM_ASTERIODS; i++) {
    let spawnPoint = asteroidSpawnPoint()
    let a = add([
        sprite('asteroid'),
        pos(spawnPoint),
        rotate(rand(1,90)),
        origin('center'),
        area(),
        solid(),
        'asteroid',
        'mobile',
        'wraps',
        {
            speed: rand(5, 10),
            initializing: true
        }
    ])

while (a.isColliding('mobile')) {
    spawnPoint = asteroidSpawnPoint()
    a.pos = spawnPoint
    a.pushOutAll()
}

a.initializing = false
    a.pushOutAll()
}
// Asteroids

  // Shooting
  onKeyDown('space', () => {
    if ( player.can_shoot ) { // can only shoot if cooldown is over
    player.can_shoot = false
      add([
          sprite('bullet'),
          pos(player.pos.add(pointAt(player.width/2, player.angle))),
          rotate(player.angle),
          origin('center'),
          area(),
          'bullet',
          'mobile',
          'destructs',
          {
              speed: 100
          }
      ])
      play('laser')
      wait(player.laser_cooldown, () => {
          player.can_shoot = true
      })
    }
  })
    
  onCollide('bullet', 'asteroid', (b, a) => {
    if (!a.initializing) {
        destroy(b)
        destroy(a)
        play('explosion')
        score++
    }
  })
})

// initialize scene 'main'
  go( 'main' )
