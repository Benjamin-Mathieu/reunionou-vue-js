<template>
    <div class="overlay">
        <div class="loading">
            <i class="gg-spinner"></i>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .overlay {
        position: fixed; z-index: 2000;
        background: rgba(0,0,0,0.8);
        width: 100vw; height: 100vh;
        --ggs:6; display: flex; justify-content: center; align-items: center;
        
        .loading {
            .gg-spinner {
                transform: scale(var(--ggs,1))
            }
            .gg-spinner,
            .gg-spinner::after,
            .gg-spinner::before {
                box-sizing: border-box;
                position: relative;
                display: block;
                width: 20px;
                height: 20px
            }
            .gg-spinner::after,
            .gg-spinner::before {
                content: "";
                position: absolute;
                border-radius: 100px
            }
            .gg-spinner::before {
                animation: spinner 1s
                cubic-bezier(.6,0,.4,1) infinite;
                border: 3px solid transparent;
                border-top-color: currentColor
            }
            .gg-spinner::after {
                border: 3px solid;
                opacity: .2
            }
            @keyframes spinner {
                0% { transform: rotate(0deg) }
                to { transform: rotate(359deg) }
            }
        }
    }
    
</style>