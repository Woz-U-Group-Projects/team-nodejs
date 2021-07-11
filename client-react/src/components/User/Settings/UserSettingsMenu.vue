<template>
    <div class="four wide column">
        <router-link class="ui button mini primary" to="/">Back Home</router-link>
        <div class="ui fluid vertical pointing menu">
            <div class="item">
                <router-link to="/settings/profile">Profile</router-link>
            </div>
            <div class="item">
                <router-link to="/settings/password">Password</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Notification from '@/components/Notification'
    import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'

    export default {
        name: 'UserProfileSettings',
        components: {
            Notification,
            UserSettingsMenu
        },
        data () {
            return {
                name: '',
                username: '',
                email: '',
                bio: '',
                location: '',
                websiteUrl: '',
                notification: {
                    message: '',
                    type: ''
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            const token = localStorage.getItem('tweetr-token')

            return token ? next() : next('/login')
        },
        created () {
            this.fetchAuthenticatedUser()
        },
        methods: {
            fetchAuthenticatedUser () {
                const token = localStorage.getItem('tweetr-token')

                axios
                    .get('account/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        this.name = response.data.data.name
                        this.username = response.data.data.username
                        this.email = response.data.data.email
                        this.location = response.data.data.location
                        this.bio = response.data.data.bio
                        this.websiteUrl = response.data.data.website_url
                    })
            },
            updateProfile () {
                const token = localStorage.getItem('tweetr-token')

                axios
                    .put(
                        '/account/update_profile',
                        {
                            name: this.name,
                            username: this.username,
                            email: this.email,
                            location: this.location,
                            bio: this.bio,
                            website_url: this.websiteUrl
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                    .then(response => {
                        // display success notification
                        this.notification = Object.assign({}, this.notification, {
                          message: response.data.message,
                          type: 'success'
                        })
                    })
            }
        }
    }
</script>