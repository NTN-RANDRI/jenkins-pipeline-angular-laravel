pipeline {
    agent any

    stages {

        stage('CI') {
            parallel {

                stage('Laravel') {
                    stages {

                        stage('Composer Install') {
                            steps {
                                bat '''
                                    cd /d "%WORKSPACE%\\laravel"

                                    composer install --no-interaction --prefer-dist
                                '''
                            }
                        }

                    }
                }

                stage('Angular') {
                    stages {

                        stage('NPM Install') {
                            steps {
                                bat '''
                                    cd /d "%WORKSPACE%\\angular"

                                    npm install
                                '''
                            }
                        }

                        stage('Angular Build') {
                            steps {
                                bat '''
                                    cd /d "%WORKSPACE%\\angular"

                                    npm run build
                                '''
                            }
                        }

                    }
                }

            }
        }

        stage('CD') {
            stages {

                stage('Deploy Laravel') {
                    steps {
                        bat '''
                            if not exist "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app" mkdir "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app"

                            robocopy "%WORKSPACE%\\laravel" "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app\\laravel" /E /XD .git /XF .env

                            if %ERRORLEVEL% LEQ 7 exit /B 0
                            exit /B %ERRORLEVEL%
                        '''
                    }
                }

                stage('Deploy Angular') {
                    steps {
                        bat '''
                            if not exist "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app\\angular" mkdir "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app\\angular"

                            robocopy "%WORKSPACE%\\angular\\dist" "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app\\angular" /E

                            if %ERRORLEVEL% LEQ 7 exit /B 0
                            exit /B %ERRORLEVEL%
                        '''
                    }
                }

                stage('Laravel migration') {
                    steps {
                        bat '''
                            cd /d "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app\\laravel"

                            php artisan migrate --force
                            php artisan config:cache
                            php artisan route:cache
                            php artisan view:cache
                        '''
                    }
                }

            }
        }
    }
}